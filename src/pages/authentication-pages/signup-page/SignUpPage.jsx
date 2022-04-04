import { Link } from "react-router-dom";
import { useAuthenticationContext } from "context";
import { useNavigate } from "react-router-dom";
import { submitSignUpDetails } from "utility";
import "./signup-page.css";

const SignUpPage = () => {
  // from react-router-dom
  const navigate = useNavigate();

  // from local storage
  const encodedToken = localStorage.getItem("token");

  // from authentication Context
  const {
    authState: { email, password, confirmPassword, firstName, lastName },
    authDispatch,
  } = useAuthenticationContext();

  return (
    <>
      <main className="sign-up-main">
        <section className="sign-up sign-up-container">
          <div className="input-container">
            <h2 className="text-center">SignUp</h2>
            <form className="input-flex gap-0">
              <label htmlFor="firstname">First Name</label>
              <input
                className="input"
                type="text"
                id="firstname"
                name="firstname"
                required
                onChange={(e) =>
                  authDispatch({ type: "FIRST_NAME", payload: e.target.value })
                }
              />
              <label htmlFor="lastname">Last Name</label>
              <input
                className="input"
                type="text"
                id="lastname"
                name="lastname"
                required
                onChange={(e) =>
                  authDispatch({ type: "LAST_NAME", payload: e.target.value })
                }
              />
              <label htmlFor="email">Email Id</label>
              <input
                className="input"
                type="email"
                id="email"
                name="email"
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
                required
                onChange={(e) => {
                  authDispatch({ type: "PASSWORD", payload: e.target.value });
                }}
              />
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                className="input"
                type="password"
                id="confirm-password"
                name="confirm-password"
                required
                onChange={(e) => {
                  authDispatch({
                    type: "CONFIRM_PASSWORD",
                    payload: e.target.value,
                  });
                }}
              />
              {confirmPassword !== "" && password === confirmPassword ? (
                <p className="signup-margin-tb-4px color-green">
                  passwords are matched
                </p>
              ) : (
                confirmPassword !== "" && (
                  <p className="signup-margin-tb-4px color-red">
                    passwords are not matched
                  </p>
                )
              )}
              <label
                htmlFor="terms-and-conditions"
                className="signup-margin-top"
              >
                <input type="checkbox" id="terms-and-conditions" /> I accept all
                Terms & Conditions
              </label>
              <button
                className="btn btn-primary"
                onClick={(event) =>
                  submitSignUpDetails(
                    event,
                    email,
                    password,
                    firstName,
                    lastName,
                    navigate,
                    encodedToken
                  )
                }
              >
                Create New Account
              </button>
            </form>
            <Link
              to="/sign-in"
              className="text-center text-lg cursor link signup-margin-tb-4px"
            >
              Already have an account<i className="fa-solid fa-angle-right"></i>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export { SignUpPage };
