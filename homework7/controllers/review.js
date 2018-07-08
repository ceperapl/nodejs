import Models from '../models';

const { Review } = Models;

export async function getReviewsByProductId(productId) {
  return Review.findOne({ productId }, ['productId', 'user', 'product', 'review']).exec();
}

export async function getAllReviews() {
  return Review.find({}, ['productId', 'user', 'product', 'review']).exec();
}
