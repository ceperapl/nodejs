export default function (queryInterface, Schema) {
  const Product = queryInterface.model('Product', new Schema({
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  }));

  return Product;
}
