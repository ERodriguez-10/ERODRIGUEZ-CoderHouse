import { createAccount } from "#controllers/auth/createAccount.controller.js";
import { deleteAccount } from "#controllers/auth/deleteAccount.controller.js";
import { getAccountByEmail } from "#controllers/auth/getAccountByEmail.controller.js";
import { getAccountByGitHubId } from "#controllers/auth/getAccountByGitHubId.controller.js";
import { getAccountByGoogleId } from "#controllers/auth/getAccountByGoogleId.controller.js";
import { updateAccount } from "#controllers/auth/updateAccount.controller.js";

export const authController = {
  createAccount,
  deleteAccount,
  getAccountByEmail,
  getAccountByGitHubId,
  getAccountByGoogleId,
  updateAccount,
};
