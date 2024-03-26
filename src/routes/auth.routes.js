import GitHubStrategy from "#configs/auth/github.config.js";
import GoogleStrategy from "#configs/auth/google.config.js";
import JwtStrategy from "#configs/auth/jwt.config.js";

import {
  githubCallbackController,
  googleCallbackController,
  registerController,
  loginController,
  logoutController,
  newPasswordController,
  recoverPasswordController,
  updateRoleController,
} from "#controllers/auth.controller.js";

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
  githubCallbackController
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
  googleCallbackController
);

authRouter.post("/register", registerController);

authRouter.post("/login", loginController);

authRouter.post("/recoverPassword", recoverPasswordController);

authRouter.post("/updatePassword/:token", newPasswordController);

authRouter.get("/logout", logoutController);

authRouter.post("/premium/:userId", updateRoleController);

export default authRouter;
