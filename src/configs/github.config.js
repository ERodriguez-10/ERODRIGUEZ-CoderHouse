import { Strategy } from "passport-github2";

const GitHubStrategy = new Strategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
  },
  (accessToken, refreshToken, profile, done) => {
    // TODO: save user to database

    console.log(profile);
    done(null, profile.id);
  }
);
export default GitHubStrategy;
