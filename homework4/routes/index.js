import express from 'express';
import setProductApi from './product';
import setUserApi from './user';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ result: 'Welcome to my application' });
});

setProductApi(router);
setUserApi(router);

export default router;
