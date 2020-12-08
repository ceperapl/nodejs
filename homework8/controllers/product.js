import Models from '../models';

const { Product } = Models;

export async function getAllProducts() {
  return Product.find({}, ['id', 'name', 'price', 'amount']).exec();
}

export async function getProductById(id) {
  return Product.findOne({ _id: id }, ['id', 'name', 'price', 'amount']).exec();
}

export async function createProduct(productBody) {
  const { name, price, amount } = productBody;
  return Product.create({ name, price, amount });
}

export async function deleteProductById(id) {
  return Product.findOneAndRemove({ _id: id }).exec();
}
