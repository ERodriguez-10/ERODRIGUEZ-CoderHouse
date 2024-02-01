import { createAccount } from "#services/auth/createAccount.services.js";
import { deleteAccount } from "#services/auth/deleteAccount.services.js";
import { getAccountByEmail } from "#services/auth/getAccountByEmail.services.js";
import { getAccountByGitHubId } from "#services/auth/getAccountByGitHubId.services.js";
import { getAccountByGoogleId } from "#services/auth/getAccountByGoogleId.services.js";
import { updateAccount } from "#services/auth/updateAccount.services.js";

export const authServices = {
  createAccount,
  deleteAccount,
  getAccountByEmail,
  getAccountByGitHubId,
  getAccountByGoogleId,
  updateAccount,
};
