import userModel from "#models/user.model.js";

export async function createAccount(account) {
  return await userModel.create(account);
}
