import Models from '../models';
import encryption from '../utils/encryption';

const { User } = Models;
const { encrypt, checkHash } = encryption;

export function getAllUsers() {
  return User.findAll({
    attributes: ['id', 'firstName', 'lastName', 'email', 'passwordHash'],
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

function getUserByEmail(email) {
  return User.findOne({
    attributes: ['id', 'firstName', 'lastName', 'email', 'passwordHash'],
    where: {
      email,
    },
  });
}

export function createUser(userBody) {
  const {
    firstName, lastName, email, password,
  } = userBody;

  const passwordHash = encrypt(password);

  return User
    .create({
      firstName,
      lastName,
      email,
      passwordHash,
    });
}

export async function login(userBody) {
  const {
    email, password,
  } = userBody;

  const user = await getUserByEmail(email);

  if (user) {
    if (checkHash(password, user.passwordHash)) {
      return user;
    }
  }
  return null;
}
