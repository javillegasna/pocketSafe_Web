import Account from "../models/account.model"
import User from "../models/user.model"
const handlerError = (res) => (err) => {
  res.status(400);
  res.json(err);
};

const create = (req, res) => {
  const {accountName,currentAmount,transactions}=req.body
  Account.create({accountName,currentAmount,transactions})
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
  const { userId,accountId } = req.params;
  User.findOneAndUpdate(
    userId,
    { $pull: { accounts: accountId } },
    { new: true }
  )
  Account.findByIdAndDelete(accountId)
    .then((deleteConfirmation) => res.json(deleteConfirmation))
    .catch(handlerError(res));
};

const update = (req, res) => {
  const { accountId } = req.params;
  const { accountName, currentAmount, transactions} = req.body;
  Account.findOneAndUpdate(
    { _id: accountId },
    { accountName, currentAmount,transactions},
    { new: true }
  )
    .then((oneAccount) => res.json(oneAccount))
    .catch(handlerError(res));
};
export {create, findAll,findOne, deleteOne,update}