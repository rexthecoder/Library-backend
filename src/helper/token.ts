import jwt from 'jsonwebtoken';

export const generateToken = (data: string | object | Buffer, expiresIn = '1h') => {
  const options = {
    expiresIn,
  };
  return jwt.sign(data, process.env.JWT_SECRET_KEY, options);
};

export const verifyToken = (token: string) => jwt.verify(token, process.env.JWT_SECRET_KEY);
