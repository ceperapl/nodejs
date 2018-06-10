import http from 'http';
import logger from '../utils/logger';

const httpServer = http.createServer();

httpServer.on('request', (req, res) => {
  res.writeHead(200);
  req.pipe(res);
});
httpServer.listen(8080);

logger.info('Echo-Server was started!');
