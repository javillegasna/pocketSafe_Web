import User from "../models/user.model";
import Account from "../models/account.model";
import Category from "../models/category.model";
import { createOneUser } from "../libs/initialSetup";
const handlerError = (res) => (err) => {
  res.status(400);
  res.json(err);
};

const create = async (req, res) => {
  try {
    const { email, password, roles } = req.body;
    const savedUser = await createOneUser({ email, password, roles });
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
    .populate("roles")
    .populate("categories")
    .populate("accounts")
    .exec()
    .then((oneUser) => res.json(oneUser))
    .catch(handlerError(res));
};
export { create, findAll, findOne, deleteOne, update };
