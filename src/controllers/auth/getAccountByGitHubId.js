import accountModel from "#models/account.js";

export async function getAccountByGitHubId(github_id) {
  return await accountModel.findOne({ github_id: github_id });
}
