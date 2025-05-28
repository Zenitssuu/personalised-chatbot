import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

export const authMiddleware = async (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.sendStatus(401).json({ error: "Unauthorized" });
  }

  const token = authorization.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    // console.log(payload);

    const email = payload?.email;

    const existingUser = await User.findOne({ email });
    // console.log("user", existingUser);

    if (!existingUser) res.status(401).json({ error: "Invalid token" });

    // console.log(payload);

    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};
