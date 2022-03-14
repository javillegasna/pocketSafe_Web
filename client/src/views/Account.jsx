/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsCashCoin } from "react-icons/bs";
import { RiHandCoinFill } from "react-icons/ri";
import { BiTransfer } from "react-icons/bi";
import ConfigContext from "../context/ConfigContext";
import UserContext from "../context/UserContext";
import Icon from "../components/Icon";
import { modelTransaction } from "../utils/models";
import SelectIcons from "../components/SelectIcons";
const Account = () => {
  //context
  const { account, setAccount, putAccount } = useContext(ConfigContext);
  const { user, putUser, setUser } = useContext(UserContext);
  //navigate
  const { accountId } = useParams();
  //states
  const [formOpen, setFormOpen] = useState(false);
  const [transaction, setTransaction] = useState(modelTransaction);
  const [formType, setFormType] = useState({
    type: "Aggregate",
    style: "success",
  });
  //effects
  useEffect(() => {
    const foundAccount = user.accounts.find(
      (element) => element._id === accountId
    );
    if (foundAccount) setAccount(foundAccount);
  }, [accountId]);
  useEffect(() => {
    if (account)
      setTransaction({ ...transaction, previousAmount: account.currentAmount });
  }, [formOpen]);
  //handlers
  const handlerSubmit = (e) => {
    console.log(typeof(parseFloat(transaction.value)));
    e.preventDefault();
    if (formType.type === "Transfer") {
      const destinationAccount = user.accounts.find(
        (element) => element._id === transaction.destination
      );
      putAccount(destinationAccount._id, {
        ...destinationAccount,
        currentAmount: (destinationAccount.currentAmount += parseFloat(
          transaction.value
        )),
        transactions: [...destinationAccount.transactions, transaction],
      });
    }
    putAccount(accountId, {
      ...account,
      currentAmount:
        formType.type === "Aggregate"
          ? (account.currentAmount += parseFloat(transaction.value))
          : (account.currentAmount -= parseFloat(transaction.value)),
      transactions: [...account.transactions, transaction],
    })
      .then((account) => {
        setAccount(account);
        return putUser(user._id, user);
      })
      .then((user) => {
        setUser(user);
        setTransaction(modelTransaction);
        localStorage.setItem("CurrentUser", JSON.stringify(user));
        setFormOpen(false);
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      {/* Header of account view */}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 className="h1">{account.accountName}</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group mr-2">
            <button
              onClick={() => {
                setFormType({ type: "Aggregate", style: "success" });
                setTransaction({
                  ...transaction,
                  type: "Aggregate",
                  destination: "",
                  origin: "",
                  category: user.categories[0]._id,
                });
                setFormOpen(true);
              }}
              className="btn btn-sm btn-outline-success"
            >
              <BsCashCoin />
            </button>
            <button
              onClick={() => {
                setFormType({ type: "Expense", style: "danger" });
                setTransaction({
                  ...transaction,
                  type: "Expense",
                  destination: "",
                  origin: "",
                  category: user.categories[0]._id,
                });
                setFormOpen(true);
              }}
              className="btn btn-sm btn-outline-danger"
            >
              <RiHandCoinFill />
            </button>
            <button
              onClick={() => {
                setFormType({ type: "Transfer", style: "secondary" });
                setTransaction({
                  ...transaction,
                  type: "Transfer",
                  origin: account._id,
                  category: "",
                });
                setFormOpen(true);
              }}
              className="btn btn-sm btn-outline-secondary"
            >
              <BiTransfer />
            </button>
          </div>
        </div>
      </div>
      {/* Card of specific account */}
      <div className="mb-3 justify-content-md-center">
        <div className="col-lg-4 card text-center">
          <Icon
            customStyle="rounded-icon mt-3"
            iconName={account.accountIcon}
          />
          <h2>{account.accountName}</h2>
          <h3>Amount: {account.currentAmount} $</h3>
        </div>
      </div>
      {/* general form of transactions */}
      {formOpen && (
        <form
          onSubmit={handlerSubmit}
          className="content-form card card-form mt-3 mb-3 p-3"
        >
          <button
            type="button"
            className="btn-close"
            onClick={() => setFormOpen(false)}
          />

          <fieldset className="form-floating m-2">
            <input
              id="floatingInput"
              className="form-control"
              placeholder="Amount"
              type="number"
              min={0}
              step={0.01}
              value={transaction.value}
              onChange={(e) =>
                setTransaction({
                  ...transaction,
                  value: e.target.value,
                })
              }
            />
            <label htmlFor="floatingInput">Amount:</label>
          </fieldset>
          <fieldset className="form-floating m-2">
            <input
              id="floatingInput"
              className="form-control"
              placeholder="Date of"
              type="datetime-local"
              value={transaction.date}
              onChange={(e) =>
                setTransaction({ ...transaction, date: e.target.value })
              }
            />
            <label htmlFor="floatingInput">Date of:</label>
          </fieldset>
          {formType.type === "Transfer" ? (
            <fieldset className=" m-2">
              <legend className="h6">Destination:</legend>
              <SelectIcons
                setValue={setTransaction}
                value={transaction}
                list={user.accounts.map((el) => ({
                  id: el._id,
                  name: el.accountName,
                  icon: el.accountIcon,
                }))}
                tag={"destination"}
              />
            </fieldset>
          ) : (
            <fieldset className=" m-2">
              <legend className="h6">Category:</legend>
              <SelectIcons
                setValue={setTransaction}
                value={transaction}
                list={user.categories.map((el) => ({
                  id: el._id,
                  name: el.categoryName,
                  icon: el.iconName,
                }))}
                tag={"category"}
              />
            </fieldset>
          )}

          <fieldset className="form-floating m-2">
            <textarea
              id="floatingInput"
              className="form-control"
              placeholder="Date of"
              type="datetime-local"
              value={transaction.description}
              onChange={(e) =>
                setTransaction({
                  ...transaction,
                  description: e.target.value,
                })
              }
            />
            <label htmlFor="floatingInput">description</label>
          </fieldset>
          <button
            className={`btn btn-${formType.style} form-button`}
            type="submit"
          >
            {formType.type}
          </button>
        </form>
      )}

      {account.transactions.map((transaction) => {
        const {
          _id,
          type,
          value,
          previousAmount,
          category,
          description,
          origin,
          destination,
        } = transaction;
        const { accounts, categories } = user;
        const foundOrigin = accounts.find((el) => el._id === origin);
        const foundDestination = accounts.find((el) => el._id === destination);
        const foundCategory = categories.find((el) => el._id === category);
        return (
          <details key={_id} className={type}>
            <summary>
              <div>
                {type === "Transfer" ? (
                  <BiTransfer />
                ) : type === "Aggregate" ? (
                  <BsCashCoin />
                ) : (
                  <RiHandCoinFill />
                )}
              </div>
              <div>{`${type}: $${value}`}</div>
            </summary>
            <div>{`Previous: $${previousAmount} `}</div>
            {category && (
              <div>
                <span className="pt-1">Category:</span>{" "}
                <Icon
                  iconName={foundCategory.iconName}
                  message={foundCategory.categoryName}
                />
              </div>
            )}
            {origin && (
              <div>
                <span className="pt-1">Origin:</span>
                <Icon
                  iconName={foundOrigin.accountIcon}
                  message={foundOrigin.accountName}
                />{" "}
                <span className="pt-1">Destination:</span>
                <Icon
                  iconName={foundDestination.accountIcon}
                  message={foundDestination.accountName}
                />
              </div>
            )}
            {description && <div> {description} </div>}
          </details>
        );
      })}
    </>
  );
};

export default Account;
