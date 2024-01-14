import { Strategy } from "passport-google-oauth20";

const GoogleStrategy = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  (accessToken, refreshToken, profile, done) => {
    // TODO: save user to database

    console.log(profile);
    done(null, profile.id);
  }
);

export default GoogleStrategy;
