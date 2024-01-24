import passport from "passport";

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, { session: false }, (error, user) => {
      if (error) return next(error);

      if (!user) {
        return res.status(401).json({
          success: false,
          error: "You are not authorized to access this resource",
        });
      }

      req.user = user;
      next();
    })(req, res, next);
  };
};
