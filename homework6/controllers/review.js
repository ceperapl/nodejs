import Models from '../models';

const { Review, User, Product } = Models;

export function getReviewsByProductId(productId) {
  return Review.findAll({
    where: {
      productId,
    },
    attributes: ['id', 'review'],
    include: [{
      model: User,
      as: 'user',
      attributes: ['id', 'firstName', 'lastName'],
    },
    {
      model: Product,
      as: 'product',
      attributes: ['id', 'name', 'price', 'amount'],
    }],
  });
}

export function getReviewById(id) {
  return Review.findAll({
    where: {
      id,
    },
    attributes: ['id', 'review'],
    include: [{
      model: User,
      as: 'user',
      attributes: ['id', 'firstName', 'lastName'],
    },
    {
      model: Product,
      as: 'product',
      attributes: ['id', 'name', 'price', 'amount'],
    }],
  });
}
