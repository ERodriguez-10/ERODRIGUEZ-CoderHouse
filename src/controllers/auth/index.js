import { createAccount } from "#controllers/auth/createAccount.js";
import { deleteAccount } from "#controllers/auth/deleteAccount.js";
import { getAccountByEmail } from "#controllers/auth/getAccountByEmail.js";
import { getAccountByGitHubId } from "#controllers/auth/getAccountByGitHubId.js";
import { getAccountByGoogleId } from "#controllers/auth/getAccountByGoogleId.js";
import { updateAccount } from "#controllers/auth/updateAccount.js";

export const authController = {
  createAccount,
  deleteAccount,
  getAccountByEmail,
  getAccountByGitHubId,
  getAccountByGoogleId,
  updateAccount,
};
