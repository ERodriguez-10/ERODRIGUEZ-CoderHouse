import { SALT_NUMBER } from "#constants/salt.constant.js";

import bycrypt from "bcrypt";

export const createHash = async (password) => {
  const salt = await bycrypt.genSalt(SALT_NUMBER);
  const hash = await bycrypt.hash(password, salt);
  return hash;
};

export const isValidPassword = async (accountPassword, passwordLogin) => {
  const isValid = await bycrypt.compare(passwordLogin, accountPassword);
  return isValid;
};
