import config from './config';
import models from './models';

console.log(config.name);

const { User, Product } = models;
new User();
new Product();
