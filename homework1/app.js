import config from './config';
import models from './models';

console.log(config.name);

const { User, Product } = models;
const user = new User();
const product = new Product();