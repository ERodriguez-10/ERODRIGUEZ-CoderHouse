import { configEnv } from "#configs/env.config.js";

import AuthServices from "#services/auth.services.js";

import { Strategy } from "passport-google-oauth20";

const GoogleStrategy = new Strategy(
  {
    clientID: configEnv.GOOGLE_CLIENT_ID,
    clientSecret: configEnv.GOOGLE_SECRET,
    callbackURL: configEnv.GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await AuthServices.getAccountByGoogleId(profile._json.sub);
      if (!user) {
        let newUser = {
          first_name: profile._json.given_name,
          last_name: profile._json.family_name,
          avatar: profile._json.picture,
          registerWith: "Google",
          role: "User",
          google_id: profile._json.sub,
        };

        let result = await AuthServices.createAccount(newUser);
        done(null, result);
      } else {
        done(null, user);
      }
    } catch (error) {
      console.log(error);
      done(null, false);
    }
  }
);

export default GoogleStrategy;
