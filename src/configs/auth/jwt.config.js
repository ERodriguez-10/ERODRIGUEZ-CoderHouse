import { Strategy, ExtractJwt } from "passport-jwt";

const cookieExtractor = (req) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }

  return token;
};

const JwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (payload, done) => {
    try {
      return done(null, payload.user);
    } catch (error) {
      return done(error);
    }
  }
);

export default JwtStrategy;
