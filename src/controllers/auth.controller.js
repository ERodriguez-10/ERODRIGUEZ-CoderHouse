import { authServices } from "#services/factory.js";

import { createHash, isValidPassword } from "#utils/bcrytp.js";
import { generateJWToken } from "#utils/jwt.js";

const githubCallbackController = async (req, res) => {
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
};

const googleCallbackController = async (req, res) => {
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
};

const registerController = async (req, res) => {
  let newUser = req.body;
  newUser.password = await createHash(newUser.password);
  try {
    const account = await authServices.createAccount(newUser);
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
};

const loginController = async (req, res) => {
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

    const account = await authServices.getAccountByEmail(email);
    if (!account) {
      throw new Error("Invalid credentials");
    }

    const verifyPassword = await isValidPassword(account.password, password);

    if (!verifyPassword) {
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
};

const logoutController = async (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json({
    success: true,
    data: "Logged out",
  });
};

const getAccountByEmailController = async (req, res) => {
  try {
    const { email } = req.params;
    const account = await authServices.getAccountByEmail(email);
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
};

export {
  githubCallbackController,
  googleCallbackController,
  registerController,
  loginController,
  logoutController,
  getAccountByEmailController,
};
