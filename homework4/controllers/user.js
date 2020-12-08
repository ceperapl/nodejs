import Models from '../models';

const { User } = Models;

export function getAllUsers() {
  return User.findAll({
    attributes: ['id', 'firstName', 'lastName', 'email'],
  });
}

export function getUserById(id) {
  return User.findOne({
    attributes: ['id', 'firstName', 'lastName', 'email'],
    where: {
      id,
    },
  });
}

export function createUser(userBody) {
  const {
    firstName, lastName, email,
  } = userBody;

  return User
    .create({
      firstName,
      lastName,
      email,
    });
}
