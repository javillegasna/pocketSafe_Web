import { defaultRoles } from "../config/defaultModels";
export const checkRolesExisted = (req, res, next) => {
  const { roles } = req.body;
  const rolesList = defaultRoles.map((role) => role.name);
  if (req.body) {
    for (const role of roles) {
      if (!rolesList.includes(role))
        return res.status(400).json({ message: `Role ${role} doesn't exist` });
    }
  }
  next();
};
