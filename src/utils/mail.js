import { configEnv } from "#configs/env.config.js";

import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: configEnv.MAIL_USER,
    pass: configEnv.MAIL_PASSWORD,
  },
});

export default async function sendInvoceToEmail(userEmail, products) {
  await transporter.sendMail({
    from: "Shop Bookify - " + configEnv.MAIL_USER,
    to: userEmail,
    subject: "Congratulations, here is your order",
    html: `
        <div>
            <h1>This is your order dear user</h1>
        </div>
        `,
  });
}
