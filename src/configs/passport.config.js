import passport from "passport";
import passportGithub from "passport-github";
import accountModel from "../models/account.model";
import { createHash, isValidPassword } from "../utils/utils.js";

const GithubStrategy = passportGithub.Strategy;

const passportConfig = () => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (userId, done) => {
    const user = await accountModel.findById(userId);
    done(null, user);
  });

  passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        const { id, displayName, username, emails } = profile;
        const email = emails[0].value;
        const user = await accountModel.findOne({ email });

        if (!user) {
          const newUser = new accountModel({
            email,
            password: await createHash(id),
            name: displayName,
            username,
            githubId: id,
          });

          await newUser.save();
          done(null, newUser);
        } else {
          done(null, user);
        }
      }
    )
  );
};

export default passportConfig;
