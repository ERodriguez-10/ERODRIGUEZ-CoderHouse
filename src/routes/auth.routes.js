import GitHubStrategy from "#configs/auth/github.config.js";
import GoogleStrategy from "#configs/auth/google.config.js";
import JwtStrategy from "#configs/auth/jwt.config.js";

import { generateJWToken } from "#utils/jwt.js";

import { Router } from "express";
import passport from "passport";

passport.use(GitHubStrategy);
passport.use(GoogleStrategy);
passport.use(JwtStrategy);

const authRouter = new Router();

authRouter.use(passport.initialize());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

authRouter.get(
  "/github",
  passport.authenticate(GitHubStrategy, { scope: ["user:email"] })
);

authRouter.get(
  "/github/callback",
  passport.authenticate(GitHubStrategy, {
    session: false,
    failureRedirect: "/",
    failureFlash: true,
  }),
  async (req, res) => {
    const user = req.user;

    const tokenGitHubUser = {
      first_name: user.first_name,
      last_name: "N/A",
      email: "N/A",
      role: user.role,
      registerWith: user.registerWith,
      userId: user._id,
    };

    const access_token = generateJWToken(tokenGitHubUser);

    res.cookie("access_token", access_token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect("/products");
  }
);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/",
    failureFlash: true,
  }),
  (req, res) => {
    const user = req.user;

    const tokenGoogleUser = {
      first_name: user.first_name,
      last_name: "N/A",
      email: "N/A",
      role: user.role,
      registerWith: user.registerWith,
      userId: user._id,
    };

    const access_token = generateJWToken(tokenGoogleUser);

    res.cookie("access_token", access_token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect("/products");
  }
);

export default authRouter;
