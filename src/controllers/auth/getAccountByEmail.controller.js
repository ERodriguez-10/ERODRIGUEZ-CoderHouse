import userModel from "#models/user.model.js";

export async function getAccountByEmail(email) {
  return await userModel.findOne({ email: email });
}
