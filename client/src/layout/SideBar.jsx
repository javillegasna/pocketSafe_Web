import { NavLink } from "react-router-dom";
import { FiHome, FiBookOpen, FiUsers } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { useContext } from "react";
import Icon from "../components/Icon";
//Context
import UserContext from "../context/UserContext";
const SideBar = () => {
  //Context
  const { user } = useContext(UserContext);
  const renderAccounts = (accounts) =>
    accounts.map((account) => (
      <li key={account._id} className="nav-item">
        <NavLink
          className="nav-link"
          to={`/${user._id}/${account._id}`}
        >
          <Icon iconName={account.accountIcon} message={account.accountName} />
        </NavLink>
      </li>
    ));

  return (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink className="nav-link" to={`/${user._id}/home`}>
              <FiHome className="feather feather-home" />
              Dashboard
            </NavLink>
          </li>
          {user.accounts !== [] && renderAccounts(user.accounts)}
        </ul>
        <hr />
        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-1 mb-1 text-muted">
          <span>Configuration</span>
        </h6>

        {user.roles[0].name === "user" ? (
          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <NavLink className="nav-link" to={`/${user._id}/categories`}>
                <BiCategory className="feather feather-home" />
                Categories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={`/${user._id}/accounts`}>
                <FiBookOpen className="feather feather-home" />
                Accounts
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <NavLink className="nav-link" to={`/${user._id}/users`}>
                <FiUsers className="feather feather-home" />
                Users
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default SideBar;
