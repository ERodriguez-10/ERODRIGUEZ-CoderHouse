import { configEnv } from "#configs/env.config.js";

import AuthServices from "#services/auth.services.js";

import { Strategy } from "passport-github2";

const GitHubStrategy = new Strategy(
  {
    clientID: configEnv.GITHUB_CLIENT_ID,
    clientSecret: configEnv.GITHUB_SECRET,
    callbackURL: configEnv.GITHUB_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await AuthServices.getAccountByGitHubId(profile._json.id);
      if (!user) {
        let newUser = {
          first_name: profile._json.name,
          avatar: profile._json.avatar_url,
          registerWith: "GitHub",
          role: "User",
          github_id: profile._json.id,
        };

        let result = await AuthServices.createAccount(newUser);
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
