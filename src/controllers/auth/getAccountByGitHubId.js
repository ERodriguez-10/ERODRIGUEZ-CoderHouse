import userModel from "#models/user.js";

export async function getAccountByGitHubId(github_id) {
  return await userModel.findOne({ github_id: github_id });
}
