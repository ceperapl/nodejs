import express from 'express';
import setProductApi from './product';
import setUserApi from './user';
import setAuthApi from './auth';
import setPassportLocalApi from './passport-local';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ result: 'Welcome to my application' });
});

setProductApi(router);
setUserApi(router);
setAuthApi(router);
setPassportLocalApi(router);

export default router;
