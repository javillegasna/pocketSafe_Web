import jwt from "jsonwebtoken";
import config from "../config/default.config";
import User from "../models/user.model";
import Role from "../models/roles.model";
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    //verify if token exist
    if (!token) return res.status(403).json({ message: "No token provided" });
    const decoded = jwt.verify(token, config.SECRET);
    //verify if user exist and save in req the userId
    const user = await User.findById(decoded.id, { password: 0 });
    if (!user) return res.status(404).json({ message: "User not found" });
    req.userId = decoded.id;
    //continue to the route
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
export const isClient = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: user.roles } });
  const listOfRoles= roles.map(rol=>rol.name);
  if(!listOfRoles.includes("client"))return res.status(403).json({message:"Unauthorized"});
  next();
};
export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: user.roles } });
  const listOfRoles= roles.map(rol=>rol.name);
  if(!listOfRoles.includes("admin"))return res.status(403).json({message:"Unauthorized"});
  next();
};
