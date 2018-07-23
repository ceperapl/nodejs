export default function (queryInterface, Schema) {
  const Review = queryInterface.model('Review', new Schema({
    productId: {
      type: Number,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    product: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  }));

  return Review;
}
