import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.cookies.auth;
  if (token) {
    jwt.verify(token, 'secret', (err) => {
      if (err) {
        res.status(403).json({
          code: 403,
          message: 'Forbidden',
        });
      } else {
        next();
      }
    });
  } else {
    res.status(403).json({
      code: 403,
      message: 'Forbidden',
    });
  }
};

const tokenVerifier = (req, res, next) => {
  const routeUrl = req.path;
  if (routeUrl === '/') {
    return next();
  }
  const regexp = /[^//]+/;
  if (regexp.exec(routeUrl)[0] === 'api' && routeUrl !== '/api/auth') {
    return verifyToken(req, res, next);
  }
  return next();
};

export default tokenVerifier;
