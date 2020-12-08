import Models from '../models';

const { Product } = Models;

export function getAllProducts() {
  return Product.findAll({
    attributes: ['id', 'name', 'price', 'amount'],
  });
}

export function getProductById(id) {
  return Product.findOne({
    attributes: ['id', 'name', 'price', 'amount'],
    where: {
      id,
    },
  });
}

export function createProduct(productBody) {
  const {
    name, price, amount,
  } = productBody;

  return Product
    .create({
      name,
      price,
      amount,
    });
}
