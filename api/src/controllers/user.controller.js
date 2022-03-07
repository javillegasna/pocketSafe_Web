import User from "../models/user.model";
import Account from "../models/account.model";
import Category from "../models/category.model";
import Role from "../models/roles.model";
import { cerateCategories, createAccounts } from "../libs/initialSetup";
const handlerError = (res) => (err) => {
  res.status(400);
  res.json(err);
};

const create = async (req, res) => {
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

    res.json(savedUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

const findAll = (req, res) => {
  User.find()
    .populate("roles")
    .then((ListOfUsers) => res.json(ListOfUsers))
    .catch(handlerError(res));
};

const findOne = async (req, res) => {
  try {
    const { userId } = req.params;
    const fountUser = await User.find({ _id: userId })
      .populate("roles")
      .populate("categories")
      .populate("accounts")
      .exec();
    if (!fountUser) return res.status(400).json("User not found");

    res.json(fountUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteOne = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      const delAccConfirm = Promise.all(
        user.accounts.map(async (account) => {
          await Account.findByIdAndDelete(account._id);
        })
      );

      const delCatConfirm = Promise.all(
        user.categories.map(async (category) => {
          await Category.findByIdAndDelete(category._id);
        })
      );
      if (delAccConfirm && delCatConfirm) return user;
    })
    .then((user) => {
      User.findByIdAndDelete(user._id)
        .then((deleteConfirmation) => res.json(deleteConfirmation))
        .catch(handlerError(res));
    })
    .catch(handlerError(res));
};

const update = (req, res) => {
  const { userId } = req.params;
  const { userName, email, password, roles, categories, accounts } = req.body;
  User.findOneAndUpdate(
    { _id: userId },
    { userName, email, password, roles, categories, accounts },
    { new: true }
  )
    .then((oneUser) => res.json(oneUser))
    .catch(handlerError(res));
};
export { create, findAll, findOne, deleteOne, update };
