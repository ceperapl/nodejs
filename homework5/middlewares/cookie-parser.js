import logger from '../utils/logger';

const parseCookies = (req) => {
  const cookies = req.headers.cookie;
  const parsedCookies = {};

  if (cookies) {
    cookies.split(';').forEach((cookie) => {
      const parts = cookie.split('=');
      parsedCookies[parts.shift().trim()] = decodeURI(parts.join('='));
    });
  }

  return parsedCookies;
};

const cookieParser = (req, res, next) => {
  req.parsedCookies = parseCookies(req);
  logger.info(`Cookie-Parser: ${JSON.stringify(req.parsedCookies)}`);
  next();
};

export default cookieParser;
