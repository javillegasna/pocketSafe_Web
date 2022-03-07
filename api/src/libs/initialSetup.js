import Role from "../models/roles.model";
import Category from "../models/category.model";
import Account from "../models/account.model";
import { defaultCategories, defaultAccounts } from "../config/defaultModels";
export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;

    await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "moderator" }).save(),
      new Role({ name: "admin" }).save(),
    ]);
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
