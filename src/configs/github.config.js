import { Strategy } from "passport-github2";
import AccountController from "../controllers/mongo/account.controller.js";

const AccountInstance = new AccountController();

const GitHubStrategy = new Strategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await AccountInstance.getAccountByGitHubId(profile._json.id);
      if (!user) {
        let newUser = {
          first_name: profile._json.name,
          last_name: "",
          email: "",
          avatar: profile._json.avatar_url,
          password: "",
          registerWith: "GitHub",
          role: "User",
          github_id: profile._json.id,
          google_id: "",
        };

        let result = await AccountInstance.createAccount(newUser);
        done(null, result);
      } else {
        done(null, user);
      }
    } catch {
      done(null, false);
    }
  }
);

export default GitHubStrategy;
