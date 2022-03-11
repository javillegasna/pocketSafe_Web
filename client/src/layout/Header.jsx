import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
//import logo from "../assets/personal-Logo.png"
const Header = () => {
  const {user } = useContext(UserContext);
  return (
    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
      <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to={`/${user._id}/home`}>
        {/* <img className="img-logo" src={logo} alt="" /> */}
        PocketSafe
      </Link>
      {/* <input
        className="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
      /> */}
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          <Link className="nav-link" to="/">
            Sign out
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;