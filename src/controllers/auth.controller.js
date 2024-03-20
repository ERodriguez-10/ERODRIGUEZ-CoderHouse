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
  console.log(newUser);
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

const mailOptionsToReset = {
  from: configEnv.MAIL_USER,
  // to: config.gmailAccount,
  subject: "Reset password",
};

const recoverPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    if (!email) {
      return res.status(400).send("Email not privided");
    }
    // Generamos un token/idrandom
    const token = uuidv4();
    const link = `http://localhost:8080/new-password/${token}`;

    // Store the email and its expiration time
    //  60 * 60 * 1000: Esto representa una hora en milisegundos. Multiplicando 60 (segundos) por 60 (minutos) y luego por 1000 (milisegundos), obtenemos el equivalente a una hora en milisegundos.
    const now = new Date();
    const oneHourMore = 60 * 60 * 1000;

    console.log(now);
    console.log(oneHourMore);

    now.setTime(now.getTime() + oneHourMore);

    console.log(now);

    const tempDbMails = {
      email,
      tokenId: token,
      expirationTime: new Date(Date.now() + 60 * 60 * 1000),
    };

    console.log(tempDbMails);

    try {
      const created = await emailServices.createEmail(tempDbMails);
      console.log(created);
    } catch (err) {
      console.log(err);
    }

    mailOptionsToReset.to = email;
    mailOptionsToReset.html = `To reset your password, click on the following link: <a href="${link}"> Reset Password</a>`;

    transporter.sendMail(mailOptionsToReset, (error, info) => {
      if (error) {
        res.status(500).send({ message: "Error", payload: error });
      }
      res.send({ success: true, payload: info });
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: "No se pudo enviar el email desde:" + configEnv.MAIL_USER,
    });
  }
};

const newPasswordController = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const bycriptPassword = await createHash(password);

  const findUser = await emailServices.getEmail(token);

  const now = new Date();
  const expirationTime = findUser.expirationTime;
  console.log("ExpTime" + expirationTime + " .Now " + now);

  if (now > expirationTime || !expirationTime) {
    await emailServices.deleteToken(token);
    console.log("Expiration time completed");
    return res.redirect("/send-email-to-reset");
  }

  try {
    console.log(findUser.email);
    console.log(bycriptPassword);
    const updatePassword = await authServices.updatePassword(
      findUser.email,
      bycriptPassword
    );
    console.log(updatePassword);
    res.send("Okey");
  } catch (err) {
    res.status(400).send({
      success: false,
      error: err.message,
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
};
