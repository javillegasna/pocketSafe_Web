//styles
import "../scss/Login.scss";
//libraries
import axios from "axios";
import { GiWallet } from "react-icons/gi";
//Modules
import config from "../configuration/default.config";
import { useContext, useState } from "react";
//Context
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  //Navigate
  const navigate = useNavigate();
  //Context
  const {setUser,setToken}=useContext(UserContext)
  //States
  const [messageError, setMessageError] = useState("");
  const [login, setLogin] = useState({ email: "", password: "" });
  //handlers
  const handlerSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${config.API_URL}auth/singin`, login)
      .then((res) =>{
        const {user,token}=res.data;
        localStorage.setItem("CurrentUser", JSON.stringify(user));
        localStorage.setItem("CurrentToken", JSON.stringify(token));
        setUser(user);
        axios.defaults.headers.common['x-access-token']=token;
        setToken(token);
        navigate(`/${user._id}/home`)
        setMessageError("");
      }
      ).catch(({response})=>setMessageError(response.data.message));
  };

  return (
    <main className="signIn">
      <form onSubmit={handlerSubmit} className="signIn__form">
        <GiWallet className="form-icon" />
        <h1 className="h3 mb-3 fw-bold">Pocket Safe SignIn</h1>

        <fieldset className="form-floating">
          <input
            id="floatingInput"
            className="form-control"
            placeholder="name@example.com"
            type="email"
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
          />
          <label htmlFor="floatingInput">Email address</label>
        </fieldset>
        <fieldset className="form-floating">
          <input
            id="floatingPassword"
            className="form-control"
            placeholder="Password"
            type="password"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
          <label htmlFor="floatingPassword">Password</label>
        </fieldset>
        {messageError !== "" && (
          <div id="emailHelp" class="form-text">
            {messageError}
          </div>
        )}
        {/* <fieldset className="checkbox m-2">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </fieldset> */}
        <button className="w-100 fw-bold btn btn-lg btn-dark" type="submit">
          Sign in
        </button>
        <p className="mt-2 mb-1 text-muted">&copy; {"2021"}</p>
      </form>
    </main>
  );
};

export default Login;
