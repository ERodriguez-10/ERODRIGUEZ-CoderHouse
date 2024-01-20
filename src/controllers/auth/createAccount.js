import accountModel from "#models/account.js";

export async function createAccount(account) {
  return await accountModel.create(account);
}
