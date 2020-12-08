export default function (queryInterface, Schema) {
  const User = queryInterface.model('User', new Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  }));

  return User;
}
