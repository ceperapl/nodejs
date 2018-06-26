import bcrypt from 'bcrypt';

const encrypt = (str) => {
  const saltRounds = 10;
  const hash = bcrypt.hashSync(str, saltRounds);

  return hash;
};

const checkHash = (str, hash) => bcrypt.compareSync(str, hash);

export default { encrypt, checkHash };
