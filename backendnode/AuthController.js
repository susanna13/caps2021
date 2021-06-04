import bcrypt from "bcryptjs";

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 8);
};

const users = [
  { username: "user", password: hashPassword("salasana"), role: "USER" },
  { username: "admin", password: hashPassword("salasana"), role: "ADMIN" },
];

export default (app) => {
  app.post("/login", (req, res, next) => {
    const { username, password } = req.body;

    const user = users.find((user) => user.username === username);

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = { role: user.role };

      res.cookie("accessToken", token, { signed: true, httpOnly: true });

      res.send(token);
    } else {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      next(error);
    }
  });
};

export const secure = (...allowedRoles) => {
  return (req, res, next) => {
    const { signedCookies } = req;

    const accessToken = signedCookies.accessToken;

    if (accessToken && allowedRoles.includes(accessToken.role)) {
      req.accessToken = accessToken;
      next();
    } else {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      next(error);
    }
  };
};