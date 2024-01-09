import createError from 'http-errors';

export default async function isAuthenticated (req, res, next) {
  console.log(req.user);
  if (!req.user) {
    const error = createError(401, 'Not authenticated!');
    return next(error);
  }
  return next();
}
