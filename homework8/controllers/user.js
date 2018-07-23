import Models from '../models';

const { User } = Models;

export async function getAllUsers() {
  return User.find({}, ['id', 'firstName', 'lastName', 'email']).exec();
}

export async function getUserById(id) {
  return User.findOne({ _id: id }, ['id', 'firstName', 'lastName', 'email']).exec();
}

export async function createUser(userBody) {
  const { firstName, lastName, email } = userBody;
  return User.create({ firstName, lastName, email });
}

export async function deleteUserById(id) {
  return User.findOneAndRemove({ _id: id }).exec();
}
