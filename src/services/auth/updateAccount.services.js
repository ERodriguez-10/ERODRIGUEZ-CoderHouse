import userModel from "#models/user.model.js";

export async function updateAccount(id, account) {
  return await userModel.findByIdAndUpdate(id, account);
}
