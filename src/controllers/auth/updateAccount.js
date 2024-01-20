import accountModel from "#models/account.js";

export async function updateAccount(id, account) {
  return await accountModel.findByIdAndUpdate(id, account);
}
