import passport from "passport";

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, { session: false }, (error, user) => {
      if (error || !user) {
        return res.status(401).json({
          status: "error",
          code: 401,
          message: "Unauthorized",
        });
      }

      req.user = user;
      next();
    })(req, res, next);
  };
};
