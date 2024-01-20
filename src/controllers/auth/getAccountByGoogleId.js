import accountModel from "#models/account.js";

export async function getAccountByGoogleId(google_id) {
  return await accountModel.findOne({ google_id: google_id });
}
