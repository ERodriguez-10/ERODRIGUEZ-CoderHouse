import accountModel from "../../models/account.model.js";

class AccountController {
  constructor() {
    this.accountModel = accountModel;
  }

  async getAccounts() {
    return await this.accountModel.find();
  }

  async getAccountByEmail(email) {
    return await this.accountModel.findOne({ email: email });
  }

  async getAccountByGitHubId(github_id) {
    return await this.accountModel.findOne({ github_id: github_id });
  }

  async getAccountByGoogleId(google_id) {
    return await this.accountModel.findOne({ google_id: google_id });
  }

  async createAccount(account) {
    console.log("llegue antes de explotar");
    console.log(account);
    const testing = await this.accountModel.create(account);
    console.log(testing);
    return testing;
  }

  async updateAccount(id, account) {
    return await this.accountModel.findByIdAndUpdate(id, account);
  }

  async deleteAccount(id) {
    return await this.accountModel.findByIdAndDelete(id);
  }
}

export default AccountController;
