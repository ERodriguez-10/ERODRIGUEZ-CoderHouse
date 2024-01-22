import userModel from "#models/user.js";

export async function getAccountByGoogleId(google_id) {
  return await userModel.findOne({ google_id: google_id });
}
