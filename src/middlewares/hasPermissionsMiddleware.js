export const hasAdminPermission = () => {
  return async (req, res, next) => {
    const { role } = req.user;

    if (role === "Admin" || role === "Premium") {
      next();
    } else {
      return res.redirect("/");
    }
  };
};

export const hasUserPermission = () => {
  return async (req, res, next) => {
    const { role } = req.user;

    if (role === "Classic" || role === "Premium") {
      next();
    } else {
      return res.redirect("/");
    }
  };
};
