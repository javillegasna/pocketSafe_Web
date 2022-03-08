import "../scss/Login.scss"
import { GiWallet } from "react-icons/gi";
const Login = () => {
  return (
    <main className="signIn">
      <form  className="signIn__form">
        <GiWallet
        className="form-icon"
        />
        <h1 className="h3 mb-3 fw-bold">Pocket Safe SignIn</h1>

        <fieldset className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </fieldset>
        <fieldset className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </fieldset>

        <fieldset className="checkbox m-2">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </fieldset>
        <button className="w-100 fw-bold btn btn-lg btn-dark" type="submit">
          Sign in
        </button>
        <p className="mt-2 mb-1 text-muted">&copy; {"2021"}</p>
      </form>
    </main>
  );
};

export default Login;
