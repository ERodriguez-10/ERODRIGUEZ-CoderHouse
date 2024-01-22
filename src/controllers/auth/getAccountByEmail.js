import userModel from "#models/user.js";

export async function getAccountByEmail(email) {
  return await userModel.findOne({ email: email });
}
