import User from "../models/user.model";
import jwt from "jsonwebtoken";
import config from "../config/default.config";
import { createOneUser } from "../libs/initialSetup";


export const singUp = async (req, res) => {
  try {
    const { userName, email, password, roles } = req.body;

    const savedUser = await createOneUser({ userName, email, password, roles });

    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
      expiresIn: 86400,
    });

    res.json({ token, user: savedUser });
  } catch (error) {
    res.status(400).json(error);
  }
};
export const singIn = async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email })
    .populate("roles")
    .populate("categories")
    .populate("accounts")
    .exec();
  if (!userFound) return res.status(400).json({ message: "Please check your email" });

  const matchPassword = await User.comparePassword(
    req.body.password,
    userFound.password
  );
  if (!matchPassword)
    return res.status(401).json({ message: "Please check your password" });

  const token = jwt.sign({ id: userFound.id }, config.SECRET, {
    expiresIn: 86400,
  });
  res.json({ token, user: userFound });
};
