import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import UserContext from "../context/UserContext";

const Home = () => {
  //Context
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const renderAccounts = (accounts) =>
    accounts.map((account) => (
      <button
        onClick={() => navigate(`/${user.id}/${account._id}`)}
        key={account._id}
        to={`/${user._id}/${account._id}`}
        className="card card-button text-center"
      >
        <Icon customStyle="rounded-icon" iconName={account.accountIcon} />
        <h2 className="h3">{account.accountName}</h2>
        <h2 className="h3">Amount: {account.currentAmount}</h2>
      </button>
    ));
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 className="h1">Dashboard</h1>
      </div>
      <div className="grid-accounts">{renderAccounts(user.accounts)}</div>
    </>
  );
};

export default Home;
