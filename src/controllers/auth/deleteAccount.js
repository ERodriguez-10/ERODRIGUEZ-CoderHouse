import accountModel from "#models/account.js";

export async function deleteAccount(id) {
  return await accountModel.findByIdAndDelete(id);
}
