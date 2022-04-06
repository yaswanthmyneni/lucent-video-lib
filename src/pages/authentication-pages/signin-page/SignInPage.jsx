import { Link } from "react-router-dom";
import { useAuthenticationContext } from "context";
import { submitSignInDetails } from "utility";
import { useNavigate } from "react-router-dom";
import "./signin-page.css";

const SignInPage = () => {
  // getting encodedToken from localStorage
  const encodedToken = localStorage.getItem("token");

  // Authentication Context
  const {
    authState: { email, password },
    authDispatch,
  } = useAuthenticationContext();

  // from react-router-dom
  const navigate = useNavigate();

  return (
    <>
      <main className="sign-in">
        <div className="input-container sign-in-container">
          <h2 className="text-center">SignIn</h2>
          <form className="input-flex">
            <label htmlFor="email">Email Id</label>
            <input
              className="input"
              type="email"
              id="email"
              name="email"
              value={email}
              required
              onChange={(e) =>
                authDispatch({ type: "EMAIL", payload: e.target.value })
              }
            />
            <label htmlFor="password">Password</label>
            <input
              className="input"
              type="password"
              id="password"
              name="password"
              value={password}
              required
              onChange={(e) =>
                authDispatch({ type: "PASSWORD", payload: e.target.value })
              }
            />
            <div className="m-top-8px sign-in-flex">
              <label className="cursor" htmlFor="remember-me">
                <input className="cursor" type="checkbox" id="remember-me" />{" "}
                Remember me
              </label>
              <Link to="/forgot-password" className="cursor">
                forgot your password?
              </Link>
            </div>
            <button
              className="btn btn-primary"
              onClick={(event) =>
                submitSignInDetails(
                  event,
                  email,
                  password,
                  navigate,
                  encodedToken
                )
              }
            >
              SignIn
            </button>
            <button
              className="btn btn-primary"
              onClick={(event) =>
                submitSignInDetails(
                  event,
                  "adarshbalika@gmail.com",
                  "adarshBalika123",
                  navigate,
                  encodedToken
                )
              }
            >
              guest sign-in
            </button>
          </form>
          <Link to="/signup" className="link">
            <p className="text-center text-lg cursor">
              Create New Account <i className="fa-solid fa-angle-right"></i>
            </p>
          </Link>
        </div>
      </main>
    </>
  );
};

export { SignInPage };
