/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import UserContext from "../context/UserContext";
import { FiBookOpen } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
const Home = () => {
  //Context
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  useEffect(() => {
    if(user.roles[0].name==="admin")navigate(`/${user._id}/users`)
  }, []);
  const renderAccounts = (accounts) =>
    accounts.map((account) => (
      <button
        onClick={() => navigate(`/${user._id}/${account._id}`)}
        key={account._id}
        to={`/${user._id}/${account._id}`}
        className="card card-button text-center"
      >
        <Icon customStyle="rounded-icon" iconName={account.accountIcon} />
        <h2 className="h3">{account.accountName}</h2>
        <h2 className="h2">{account.currentAmount}$</h2>
      </button>
    ));
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 className="h1">Dashboard</h1>
        <nav className="btn-group me-2 nav-home">
          <button
            onClick={() => navigate(`/${user.id}/categories`)}
            type="button"
            className="btn btn-sm btn-outline-secondary"
          >
            <BiCategory className="feather feather-home" />
            {"  "}Categories
          </button>
          <button
            onClick={() => navigate(`/${user.id}/accounts`)}
            type="button"
            className="btn btn-sm btn-outline-secondary"
          >
            <FiBookOpen className="feather feather-home" />
            {"  "}Accounts
          </button>
        </nav>
      </div>
      <div className="grid-accounts">{renderAccounts(user.accounts)}</div>
    </>
  );
};

export default Home;
