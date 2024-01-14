import { Router } from "express";
import passport from "passport";
import GitHubStrategy from "../configs/github.config.js";
import GoogleStrategy from "../configs/google.config.js";

// TODO: Add more strategies

passport.use(GitHubStrategy);
passport.use(GoogleStrategy);

const authRouter = new Router();

authRouter.use(passport.initialize());
authRouter.use(passport.session());

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
    failureRedirect: "/",
    failureFlash: true,
  }),
  (req, res) => {
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
    failureRedirect: "/",
    failureFlash: true,
  }),
  (req, res) => {
    res.redirect("/products");
  }
);

export default authRouter;
