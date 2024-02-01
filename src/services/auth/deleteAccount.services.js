import userModel from "#models/user.model.js";

export async function deleteAccount(id) {
  return await userModel.findByIdAndDelete(id);
}
