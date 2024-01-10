import bycrypt from "bcrypt";

export const createHash = async (password) => {
  const salt = await bycrypt.genSalt(10);
  const hash = await bycrypt.hash(password, salt);
  return hash;
};

export const isValidPassword = async (password, hash) => {
  const isValid = await bycrypt.compare(password, hash);
  return isValid;
};
