import http from 'http';
import logger from '../utils/logger';

const httpServer = http.createServer();

httpServer.on('request', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain',
  });
  res.end('Hello World');
});
httpServer.listen(8080);

logger.info('Plain-text Server was started!');
