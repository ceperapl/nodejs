import http from 'http';
import logger from '../utils/logger';

const product = {
  id: 1,
  name: 'Supreme T-Shirt',
  brand: 'Supreme',
  price: 99.99,
  options: [
    { color: 'blue' },
    { size: 'XL' },
  ],
};

const httpServer = http.createServer();

httpServer.on('request', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/json',
  });
  res.end(JSON.stringify(product));
});
httpServer.listen(8080);

logger.info('Json-Server was started!');
