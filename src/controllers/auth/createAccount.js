import userModel from "#models/user.js";

export async function createAccount(account) {
  return await userModel.create(account);
}
