import "./logout-page.css";
import { Link } from "react-router-dom";

const LogoutPage = () => {
  return (
    <>
      <div className="logout-flex logout-margin-top">
        <h2>You logged out successfully</h2>
        <div className="logout-flex logout-flex-direction">
          <Link className="btn btn-primary text-lg" to="/sign-in">
            Login
          </Link>
          <Link className="btn btn-primary text-lg" to="/">
            Home
          </Link>
        </div>
      </div>
    </>
  );
};

export { LogoutPage };
