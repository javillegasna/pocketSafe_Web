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
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  //Navigate
  const navigate = useNavigate();
  //Context
  const { setUser, setToken } = useContext(UserContext);
  //States
  const [messageError, setMessageError] = useState({
    password: {
      exp: /^.{4,12}$/,
      std: true,
      msg: "Please enter a valid password",
    },
    email: {
      exp: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      std: true,
      msg: "Please enter a valid email",
    },
    confirmPassword: { std: true, msg: "Please enter the same password" },
  });
  const [login, setLogin] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  //handlers
  const validator = (type, value) => {
    if (messageError[type].exp.test(value) !== messageError[type].std) {
      setMessageError({
        ...messageError,
        [type]: {
          ...messageError[type],
          std: messageError[type].exp.test(value),
        },
      });
    }
  };
  const handlerStyle=(type)=>{
    if(login[type]==="")return ""
    return `text-${
      messageError[type].std ? "success" : "danger"
    }`
  }
  const handlerSubmit = (event) => {
    event.preventDefault();
    const { password, email, confirmPassword } = messageError;
    const validation = password.std && email.std && confirmPassword.std;
    const emptyValidation =
      login.email!=="" && login.password!=="" && login.confirmPassword!=="";
    if (validation && emptyValidation)
      axios
        .post(`${config.API_URL}auth/singup`, login)
        .then((res) => {
          const { user, token } = res.data;
          localStorage.setItem("CurrentUser", JSON.stringify(user));
          localStorage.setItem("CurrentToken", JSON.stringify(token));
          setUser(user);
          axios.defaults.headers.common["x-access-token"] = token;
          setToken(token);
          navigate(`/${user._id}/home`);
        })
        .catch(({ response }) => console.log(response));
  };

  return (
    <main className="signIn">
      <form onSubmit={handlerSubmit} className="signIn__form">
        <GiWallet className="form-icon" />
        <h1 className="h3 mb-3 fw-bold text-withe">Pocket Safe SignUp</h1>

        <fieldset className="form-floating">
          <input
            id="floatingInput"
            className="form-control"
            placeholder="name@example.com"
            type="email"
            value={login.email}
            onChange={(e) => {
              setLogin({ ...login, email: e.target.value });
              validator("email", e.target.value);
            }}
          />
          <label
            htmlFor="floatingInput"
            className={handlerStyle("email")}
          >
            {messageError.email.std ? "Email Address" : messageError.email.msg}
          </label>
        </fieldset>
        <fieldset className="form-floating">
          <input
            id="floatingPassword"
            className="form-control"
            placeholder="Password"
            type="password"
            value={login.password}
            onChange={(e) => {
              setLogin({ ...login, password: e.target.value });
              validator("password", e.target.value);
            }}
          />
          <label
            htmlFor="floatingPassword"
            className={handlerStyle("password")}
          >
            {messageError.password.std ? "Password" : messageError.password.msg}
          </label>
        </fieldset>
        <fieldset className="form-floating">
          <input
            id="floatingConfirmPassword"
            className="form-control"
            placeholder="Confirm password"
            type="password"
            value={login.confirmPassword}
            onChange={(e) => {
              setLogin({ ...login, confirmPassword: e.target.value });
              setMessageError({
                ...messageError,
                confirmPassword: {
                  ...messageError.confirmPassword,
                  std: login.password === e.target.value,
                },
              });
            }}
          />
          <label
            htmlFor="floatingConfirmPassword"
            className={handlerStyle("confirmPassword")}
          >
            {messageError.confirmPassword.std
              ? "Confirm Password"
              : messageError.confirmPassword.msg}
          </label>
        </fieldset>
        <button
          className="w-100 mt-2 fw-bold btn btn-lg btn-dark"
          type="submit"
        >
          Sign Up
        </button>
        <Link className="pt-3" to ={`/`}>Login?</Link>
        <p className="mt-2 mb-1 text-muted">&copy; {"2021"}</p>
        
      </form>
    </main>
  );
};

export default Register;
