import { authServices, emailServices } from "#services/factory.js";

import { createHash, isValidPassword } from "#utils/bcrytp.js";
import { generateJWToken } from "#utils/jwt.js";

import { v4 as uuidv4 } from "uuid";

import { configEnv } from "#configs/env.config.js";

import { transporter } from "../utils/mail.js";

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
    const account = await authServices.getAccountByEmail(email);
    if (!account) {
      throw new Error("Invalid credentials");
    }

    const verifyPassword = await isValidPassword(account.password, password);

    if (!verifyPassword) {
      throw new Error("Invalid credentials");
    }

    if (account.role === "Admin") {
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

    const tokenUser = {
      first_name: account.first_name,
      last_name: account.last_name,
      email: account.email,
      role: account.role,
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

const recoverPasswordController = async (req, res) => {
  const mailOptionsToReset = {
    from: configEnv.MAIL_USER,
    // to: config.gmailAccount,
    subject: "Reset password",
  };

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send("Email not privided");
    }
    // Generamos un token/idrandom
    const token = uuidv4();
    const link = `http://localhost:8080/updatePassword/${token}`;

    // Store the email and its expiration time
    //  60 * 60 * 1000: Esto representa una hora en milisegundos. Multiplicando 60 (segundos) por 60 (minutos) y luego por 1000 (milisegundos), obtenemos el equivalente a una hora en milisegundos.
    const now = new Date();
    const oneHourMore = 60 * 60 * 1000;

    now.setTime(now.getTime() + oneHourMore);

    const tempDbMails = {
      email,
      tokenId: token,
      expirationTime: new Date(Date.now() + 60 * 60 * 1000),
    };

    try {
      await emailServices.createEmail(tempDbMails);
    } catch (err) {
      console.log(err);
    }

    mailOptionsToReset.to = email;
    mailOptionsToReset.html = `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
              }
              .email-container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #fff;
                  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
              }
              .email-body {
                  font-size: 16px;
                  line-height: 1.5;
                  color: #333;
              }
              .email-footer {
                  text-align: center;
                  padding-top: 20px;
                  color: #888;
              }
              .btn {
                  display: inline-block;
                  color: #fff !important;
                  background-color: #3498db;
                  padding: 10px 20px;
                  text-decoration: none;
                  border-radius: 3px;
              }
          </style>
      </head>
      <body>
          <div class="email-container">
              <div class="email-body">
                  <p>Hello,</p>
                  <p>You have requested to reset your password. Please click the button below to proceed.</p>
                  <p><a href="${link}" class="btn">Reset Password</a></p>
                  <p>If you did not request this, please ignore this email.</p>
                  <p>Best,</p>
                  <p>The BookifyStore Team</p>
              </div>
              <div class="email-footer">
                  <p>© ${new Date().getFullYear()} BookifyStore. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
      `;

    transporter.sendMail(mailOptionsToReset, (error, info) => {
      if (error) {
        return res.status(400).send({ message: "Error", payload: error });
      }
      res.status(201).send({ success: true, payload: info });
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: "Could not send the email from:" + configEnv.MAIL_USER,
    });
  }
};

const newPasswordController = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const bycriptPassword = await createHash(password);

  try {
    let findUser = await emailServices.getEmail(token);

    if (findUser === null) {
      throw new Error("Token is invalid");
    }

    const now = new Date();
    const expirationTime = findUser.expirationTime;

    if (now > expirationTime || !expirationTime) {
      await emailServices.deleteToken(token);
      return res.redirect("/recoverPassword");
    }

    const account = await authServices.getAccountByEmail(findUser.email);

    if (!account) {
      throw new Error("Invalid credentials");
    }

    const isSamePassword = await isValidPassword(account.password, password);

    if (isSamePassword) {
      throw new Error("This is your current password. Please try another one.");
    }

    await authServices.updatePassword(findUser.email, bycriptPassword);

    await emailServices.deleteToken(token);

    res.status(200).send({ success: true, error: null });
  } catch (err) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};

const updateRoleController = async (req, res) => {
  const { userId } = req.params;

  try {
    const userData = await authServices.getAccountById(userId);

    if (!userData) {
      throw new Error("User not found");
    }

    let newRole;

    if (userData.role === "Classic") {
      newRole = "Premium";
    } else {
      newRole = "Classic";
    }

    const account = await authServices.updateRole(userId, newRole);

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
  recoverPasswordController,
  newPasswordController,
  updateRoleController,
};
