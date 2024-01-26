import { authController } from "#controllers/auth/index.controller.js";

import { Strategy } from "passport-google-oauth20";

const GoogleStrategy = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await authController.getAccountByGoogleId(profile._json.sub);
      if (!user) {
        let newUser = {
          first_name: profile._json.given_name,
          last_name: profile._json.family_name,
          avatar: profile._json.picture,
          registerWith: "Google",
          role: "User",
          google_id: profile._json.sub,
        };

        let result = await authController.createAccount(newUser);
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
