import { EErrors } from "#services/errors/enumsError.js";

export default (error, req, res, next) => {
  let statusCode = 500;

  if (error.code) {
    statusCode = error.code >= 400 && error.code < 600 ? error.code : 500;
  }

  res.status(statusCode).json({ status: "error", error: error.message });
};
