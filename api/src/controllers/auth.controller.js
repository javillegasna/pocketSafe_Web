import User from "../models/user.model";
import jwt from "jsonwebtoken";
import config from "../config/default.config";
import Role from "../models/roles.model";
import { cerateCategories, createAccounts } from "../libs/initialSetup";

//import { Accounts, Categories } from "../config/defaultModels";

export const singUp = async (req, res) => {
  try {
    const { userName, email, password, roles } = req.body;

    const newUser = new User({
      userName,
      email,
      password: await User.encryptPassword(password),
    });

    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
      newUser.accounts = await createAccounts();
      newUser.categories = await cerateCategories();
    }

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
      expiresIn: 86400,
    });

    res.json({ token, savedUser });
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
  if (!userFound) return res.status(400).json({ message: "User not found" });

  const matchPassword = await User.comparePassword(
    req.body.password,
    userFound.password
  );
  if (!matchPassword)
    return res.status(401).json({ message: "Invalid Password" });

  const token = jwt.sign({ id: userFound.id }, config.SECRET, {
    expiresIn: 86400,
  });
  res.json({token, userFound});
};
