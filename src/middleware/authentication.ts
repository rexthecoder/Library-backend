import { UserEntity } from '../entities/UserEntity';
import { tokenHelper } from '../helper';
import handleGetRepository from '../utils/handleGetRepository';
import { Request, Response, NextFunction } from 'express';

// Define a custom type for authenticated requests
interface AuthenticatedRequest extends Request {
  user?: UserEntity; // Change this to the actual type of your user entity
}

export default async function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  // Get authorization header from request
  const authorization = req.headers.authorization;
  const refreshToken = req.headers.refreshtoken;

  // Firstly, set request user to null
  req.user = null;

  console.log(req.params)
  console.log(authorization)
  console.log(refreshToken)

  // Check for empty Authorization header
  if (!authorization) {
    return next();
  }

  // If the headers are an array, take the first element
  const token = Array.isArray(authorization) ? authorization[0].substring(7) : authorization.substring(7);
  const tokenData = await tokenHelper.verifyToken(token);

  console.log(tokenData.id)
  // Find user from the database
  const userRepository = handleGetRepository(UserEntity);
  const user = await userRepository.findOneBy({ userId: tokenData.id });

  // Check if the user exists
  if (!user) {
    return res.status(401).json({ message: 'There is no user'});
  }

  // Set request user
  req.user = user;
  // console.log(req.user)
  // Check if the token renewal time is approaching
  const now = new Date();
  const exp = new Date(tokenData.exp * 1000);
  const difference = exp.getTime() - now.getTime();
  const minutes = Math.round(difference / 60000);

  // Check for refresh token and time left
  if (refreshToken && minutes < 15) {
    // Verify refresh token and get refresh token data
    const refreshTokenData = await tokenHelper.verifyToken(Array.isArray(refreshToken) ? refreshToken[0] : refreshToken);

    // Check the user of the refresh token
    if (refreshTokenData.id === tokenData.id) {
      // Generate new tokens
      const newToken = user.generateToken();
      const newRefreshToken = user.generateToken('2h');

      // Set response headers
      res.setHeader('Token', newToken);
      res.setHeader('RefreshToken', newRefreshToken);
    }
  }

  // Go to the next middleware
  return next();
}
