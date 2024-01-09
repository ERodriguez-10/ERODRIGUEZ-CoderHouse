import { Router } from "express";
import AccountController from "../controllers/mongo/account.controller.js";

const sessionRouter = Router();
const accountController = new AccountController();

sessionRouter.post("/register", async (req, res) => {
  try {
    const account = await accountController.createAccount(req.body);
    res.status(201).json({
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
  try {
    const { email, password } = req.body;

    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
      req.session.user = "Admin";
      req.session.lastName = "N/A";
      req.session.role = "admin";
      req.session.email = "N/A";
      return res.status(200).json({
        success: true,
        data: "admin",
      });
    }

    const account = await accountController.getAccountByEmail(email);
    if (!account) {
      throw new Error("Invalid credentials");
    }
    if (account.password !== password) {
      throw new Error("Invalid credentials");
    }

    req.session.user = account.first_name;
    req.session.lastName = account.last_name;
    req.session.email = account.email;
    req.session.role = "user";

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
  req.session.destroy((err) => {
    if (err) {
      res.status(400).json({
        success: false,
        error: err.message,
      });
    } else {
      res.status(200).json({
        success: true,
        data: "User logged out",
      });
    }
  });
});

sessionRouter.get("/user/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const account = await accountController.getAccountByEmail(email);
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
