/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import ConfigContext from "../context/ConfigContext";
import Icon from "../components/Icon";
import GenericList from "../components/GenericList";
import * as FontAwesome from "react-icons/fa";
import ModalGrid from "../components/ModalGrid";
const EditAccounts = () => {
  //context
  const { user, setUser, putUser } = useContext(UserContext);
  //estates
  const { postAccount, deleteAccount, putAccount } = useContext(ConfigContext);
  const [frmOpen, setFrmOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formAccount, setFormAccount] = useState({
    accountName: "",
    accountIcon: "FaExclamationCircle",
    currentAmount: 0,
    transactions: [],
  });
  //handlers

  const handlerSubmit = (e) => {
    e.preventDefault();
    const action = editing
      ? putAccount(formAccount._id, formAccount)
      : postAccount(formAccount);
    action
      .then((account) => {
        const { accounts } = user;
        return putUser(user._id, {
          ...user,
          accounts: editing ? accounts : [...accounts, account],
        });
      })
      .then((user) => {
        setUser(user);
        localStorage.setItem("CurrentUser", JSON.stringify(user));
        setFrmOpen(false);
        setEditing(false);
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
        <form
          onSubmit={handlerSubmit}
          className="content-form card card-form mb-3"
        >
          <button
            onClick={() => setModalOpen(true)}
            type="button"
            className=" btn btn-outline-secondary form-button text-center mt-2"
          >
            <Icon
              customStyle={"rounded-icon"}
              iconName={formAccount.accountIcon}
            />
          </button>

          <fieldset className="form-floating m-2">
            <input
              id="floatingInput"
              className="form-control"
              placeholder="Account Name"
              type="text"
              value={formAccount.accountName}
              onChange={(e) =>
                setFormAccount({ ...formAccount, accountName: e.target.value })
              }
            />
            <label htmlFor="floatingInput">Account Name:</label>
          </fieldset>
          <button className="btn btn-dark form-button" type="submit">
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
          edit: (item) => {
            setFormAccount({
              ...formAccount,
              _id: item.id,
              accountName: item.name,
              accountIcon: item.icon,
            });
            setFrmOpen(true);
            setEditing(true);
          },
          delete: (item) => {
            deleteAccount(item.id, user._id)
              .then((user) => {
                localStorage.setItem("CurrentUser", JSON.stringify(user));
                setUser(user);
              })
              .catch((err) => console.log(err));
          },
        }}
        idFather={user._id}
      />
      {modalOpen && (
        <ModalGrid
          listIcons={Object.keys(FontAwesome)}
          setProperty={setFormAccount}
          setState={setModalOpen}
          property={formAccount}
          state={false}
        />
      )}
    </>
  );
};

export default EditAccounts;
