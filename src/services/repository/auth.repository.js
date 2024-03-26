export default class AuthRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createAccount = async (account) => {
    return await this.dao.createAccount(account);
  };

  getAccountById = async (userId) => {
    return await this.dao.getAccountById(userId);
  };

  getAccountByEmail = async (email) => {
    return await this.dao.getAccountByEmail(email);
  };

  getAccountByGitHubId = async (github_id) => {
    return await this.dao.getAccountByGitHubId(github_id);
  };

  getAccountByGoogleId = async (google_id) => {
    return await this.dao.getAccountByGoogleId(google_id);
  };

  updateAccount = async (id, account) => {
    return await this.dao.updateAccount(id, account);
  };

  updatePassword = async (email, password) => {
    return await this.dao.updatePassword(email, password);
  };

  deleteAccount = async (id) => {
    return await this.dao.deleteAccount(id);
  };

  updateRole = async (userId, role) => {
    return await this.dao.updateRole(userId, role);
  };
}
