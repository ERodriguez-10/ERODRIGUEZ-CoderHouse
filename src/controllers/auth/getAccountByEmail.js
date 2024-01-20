import accountModel from "#models/account.js";

export async function getAccountByEmail(email) {
  return await accountModel.findOne({ email: email });
}
