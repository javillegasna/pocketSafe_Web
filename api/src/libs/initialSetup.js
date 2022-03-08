import Role from "../models/roles.model";
import Category from "../models/category.model";
import Account from "../models/account.model";
import User from "../models/user.model";
import {
  defaultCategories,
  defaultAccounts,
  defaultRoles,
  defaultUsers,
} from "../config/defaultModels";
export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;

    return await Promise.all(
      defaultRoles.map(async (category) => await new Role(category).save())
    );
  } catch (error) {
    console.error(error);
  }
};

export const cerateCategories = async () => {
  try {
    return await Promise.all(
      defaultCategories.map(
        async (category) => await new Category(category).save()
      )
    );
  } catch (error) {
    console.error(error);
  }
};

export const createAccounts = async () => {
  try {
    return await Promise.all(
      defaultAccounts.map(async (account) => await new Account(account).save())
    );
  } catch (error) {
    console.error(error);
  }
};
export const createUsers = async () => {
  try {
    const count = await User.estimatedDocumentCount();
    if (count > 0) return;
    return await Promise.all(
      defaultUsers.map(async (user) => {
        await createOneUser(user);
      })
    );
  } catch (error) {
    console.error(error);
  }
};
export const createOneUser = async (data) => {
  const { userName, email, password, roles } = data;

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

  return await newUser.save();
};
