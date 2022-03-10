import Account from "../models/account.model";
import User from "../models/user.model";
const handlerError = (res) => (err) => {
  res.status(400);
  res.json(err);
};

const create = (req, res) => {
  const { accountName, accountIcon, currentAmount, transactions } = req.body;
  Account.create({ accountName, accountIcon, currentAmount, transactions })
    .then((newAccount) => res.status(201).json(newAccount))
    .catch(handlerError(res));
};

const findAll = (req, res) => {
  Account.find()
    .then((ListOfAccounts) => res.json(ListOfAccounts))
    .catch(handlerError(res));
};

const findOne = (req, res) => {
  const { accountId } = req.params;
  Account.findById(accountId)
    .then((oneAccount) => res.json(oneAccount))
    .catch(handlerError(res));
};

const deleteOne = (req, res) => {
  const { userId, accountId } = req.params;
  Account.findByIdAndDelete(accountId)
    .then((account) =>
      User.findOneAndUpdate(
        { _id: userId },
        { $pull: { accounts: account._id } },
        { new: true }
      )
        .populate("roles")
        .populate("categories")
        .populate("accounts")
        .exec()
    )
    .then((user) => res.json(user))
    .catch(handlerError(res));
};

const update = (req, res) => {
  const { accountId } = req.params;
  const { accountName, accountIcon, currentAmount, transactions } = req.body;
  Account.findOneAndUpdate(
    { _id: accountId },
    { accountName, accountIcon, currentAmount, transactions },
    { new: true }
  )
    .then((oneAccount) => res.json(oneAccount))
    .catch(handlerError(res));
};
export { create, findAll, findOne, deleteOne, update };
