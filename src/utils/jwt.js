import { configEnv } from "#configs/env.config.js";

import jwt from "jsonwebtoken";

export const generateJWToken = (user) => {
  const token = jwt.sign({ user }, configEnv.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};
