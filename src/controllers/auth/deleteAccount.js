import userModel from "#models/user.js";

export async function deleteAccount(id) {
  return await userModel.findByIdAndDelete(id);
}
