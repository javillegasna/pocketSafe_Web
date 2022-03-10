/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import ConfigContext from "../context/ConfigContext";
import Icon from "../components/Icon";
import GenericList from "../components/GenericList";

const EditAccounts = () => {
  const { user, setUser, putUser } = useContext(UserContext);
  const { postAccount, setAccountList } = useContext(ConfigContext);
  const [frmAccount, setFormAccount] = useState({
    accountName: "",
    accountIcon: "FaExclamationCircle",
    currentAmount: 0,
    transactions: [],
  });
  //effects
  const [frmOpen, setFrmOpen] = useState(false);
  useEffect(() => {
    setAccountList(user.accounts);
  }, []);
  //handlers
  const handlerSubmit = (e) => {
    e.preventDefault();
    postAccount(frmAccount)
      .then((account) => {
        const { accounts } = user;
        return putUser(user._id, {
          ...user,
          accounts: [...accounts, account],
        });
      })
      .then((user) => {
        setUser(user);
        localStorage.setItem("CurrentUser", JSON.stringify(user));
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 className="h1">EditAccounts</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <button
            onClick={() => setFrmOpen(!frmOpen)}
            className="btn btn-sm btn-outline-secondary "
          >
            <Icon
              iconName={frmOpen ? "FaRegMinusSquare" : "FaRegPlusSquare"}
              message={frmOpen ? "Close" : "New"}
            />
          </button>
        </div>
      </div>

      {frmOpen && (
        <form onSubmit={handlerSubmit} className="content-form card mb-3">
          <Icon customStyle="rounded-icon text-center mt-2" />

          <fieldset className="form-floating m-2">
            <input
              id="floatingInput"
              className="form-control"
              placeholder="Account Name"
              type="text"
              value={frmAccount.accountName}
              onChange={(e) =>
                setFormAccount({ ...frmAccount, accountName: e.target.value })
              }
            />
            <label htmlFor="floatingInput">Account Name:</label>
          </fieldset>
          <button className="w-50 m-3 fw-bold btn btn-dark" type="submit">
            Sign in
          </button>
        </form>
      )}
      <GenericList
        list={user.accounts.map((el) => ({
          id: el._id,
          name: el.accountName,
          icon: el.accountIcon,
        }))}
        actions={{
          edit: () => console.log("editing"),
          delete: () => console.log("deleting"),
        }}
        idFather={user._id}
      />
    </>
  );
};

export default EditAccounts;
