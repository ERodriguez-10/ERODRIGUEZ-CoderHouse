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

  async createAccount(account) {
    return await this.accountModel.create(account);
  }

  async updateAccount(id, account) {
    return await this.accountModel.findByIdAndUpdate(id, account);
  }

  async deleteAccount(id) {
    return await this.accountModel.findByIdAndDelete(id);
  }
}

export default AccountController;
