import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import router from './routes';
// import middlewares from './middlewares';
import swaggerInit from './swagger';

const app = express();
// const { tokenVerifier } = middlewares;

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(tokenVerifier);
app.use('/api', router);
app.get('/', (req, res) => {
  res.json({ result: 'Welcome to express server!' });
});
swaggerInit(app);
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Page not found!' });
});

export default app;
