import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';
import middlewares from './middlewares';
import swaggerInit from './swagger';

const app = express();
const { queryParser, cookieParser } = middlewares;

app.use(queryParser);
app.use(cookieParser);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);
app.get('/', (req, res) => {
  res.json({ result: 'Welcome to express server!' });
});
swaggerInit(app);
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Page not found!' });
});

export default app;
