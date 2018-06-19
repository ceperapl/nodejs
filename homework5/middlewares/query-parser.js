import { parse } from 'url';
import logger from '../utils/logger';

const queryParser = (req, res, next) => {
  req.parsedQuery = parse(req.url, true).query;
  logger.info(`Query-Parser: ${JSON.stringify(req.parsedQuery)}`);
  next();
};

export default queryParser;
