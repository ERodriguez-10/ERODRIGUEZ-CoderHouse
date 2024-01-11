import { Router } from "express";
import passport from "passport";
import GitHubStrategy from "../configs/passport.config.js";

passport.use(GitHubStrategy);

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

export default authRouter;
