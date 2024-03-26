import userModel from "#models/user.model.js";

export default class AuthDAO {
  constructor() {}

  createAccount = async (account) => {
    return await userModel.create(account);
  };

  getAccountById = async (userId) => {
    return await userModel.findById({ _id: userId });
  };

  getAccountByEmail = async (email) => {
    return await userModel.findOne({ email: email });
  };

  getAccountByGitHubId = async (github_id) => {
    return await userModel.findOne({ github_id: github_id });
  };

  getAccountByGoogleId = async (google_id) => {
    return await userModel.findOne({ google_id: google_id });
  };

  updateAccount = async (id, account) => {
    return await userModel.findByIdAndUpdate(id, account);
  };

  deleteAccount = async (id) => {
    return await userModel.findByIdAndDelete(id);
  };

  updatePassword = async (email, password) => {
    return await userModel.findOneAndUpdate(
      { email: email },
      { password: password }
    );
  };

  updateRole = async (userId, role) => {
    return await userModel.findOneAndUpdate(
      { _id: userId },
      { role: role },
      { new: true }
    );
  };
}
