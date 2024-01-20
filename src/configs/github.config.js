import { Strategy } from "passport-github2";
import {
  getAccountByGitHubId,
  createAccount,
} from "#controllers/auth/index.js";

const GitHubStrategy = new Strategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await getAccountByGitHubId(profile._json.id);
      if (!user) {
        let newUser = {
          first_name: profile._json.name,
          avatar: profile._json.avatar_url,
          registerWith: "GitHub",
          role: "User",
          github_id: profile._json.id,
        };

        let result = await createAccount(newUser);
        done(null, result);
      } else {
        done(null, user);
      }
    } catch (error) {
      done(null, false);
    }
  }
);

export default GitHubStrategy;
