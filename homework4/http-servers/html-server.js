import http from 'http';
import fs from 'fs';
import replace from 'stream-replace';
import logger from '../utils/logger';

const messagePattern = '{message}';
const message = 'My message';
const indexPath = `${__dirname}/data/index.html`;

function streamProcess(htmlFilePath, pattern, mes) {
  return fs.createReadStream(htmlFilePath)
    .pipe(replace(pattern, mes));
}

// function fileProcess(htmlFilePath, pattern, mes) {
//   const data = fs.readFileSync(htmlFilePath);
//   return data.toString().replace(pattern, mes);
// }

const httpServer = http.createServer();

httpServer.on('request', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html',
  });
  // res.end(fileProcess(indexPath, messagePattern, message));
  streamProcess(indexPath, messagePattern, message).pipe(res);
});
httpServer.listen(8080);

logger.info('HTML-Server was started!');
