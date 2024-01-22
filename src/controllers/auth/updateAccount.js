import userModel from "#models/user.js";

export async function updateAccount(id, account) {
  return await userModel.findByIdAndUpdate(id, account);
}
