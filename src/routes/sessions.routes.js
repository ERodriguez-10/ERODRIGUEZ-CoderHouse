import { authController } from "#controllers/auth/index.controller.js";

import { createHash, isValidPassword } from "#utils/bcrytp.js";
import { generateJWToken } from "#utils/jwt.js";

import { Router } from "express";

const sessionRouter = Router();

sessionRouter.post("/register", async (req, res) => {
  let newUser = req.body;
  newUser.password = await createHash(newUser.password);
  try {
    const account = await authController.createAccount(newUser);
    return res.status(200).json({
      success: true,
      data: account,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

sessionRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
      const tokenAdmin = {
        first_name: "Admin",
        last_name: "N/A",
        email: "N/A",
        role: "Admin",
        registerWith: "App",
      };

      const access_token = generateJWToken(tokenAdmin);

      res.cookie("access_token", access_token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        success: true,
        data: "Admin",
      });
    }

    const account = await authController.getAccountByEmail(email);
    if (!account) {
      throw new Error("Invalid credentials");
    }

    const verifyPassowrd = await isValidPassword(account.password, password);

    if (!verifyPassowrd) {
      throw new Error("Invalid credentials");
    }

    const tokenUser = {
      first_name: account.first_name,
      last_name: account.last_name,
      email: account.email,
      role: "user",
      registerWith: account.registerWith,
      userId: account._id,
    };

    const access_token = generateJWToken(tokenUser);

    res.cookie("access_token", access_token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      data: account,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

sessionRouter.get("/logout", async (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json({
    success: true,
    data: "Logged out",
  });
});

sessionRouter.get("/user/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const account = await authController.getAccountByEmail(email);
    if (!account) {
      throw new Error("Invalid credentials");
    }
    res.status(200).json({
      success: true,
      data: account,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

export default sessionRouter;
