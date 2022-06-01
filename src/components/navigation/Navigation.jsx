import "./navigation.css";
import { NavLink, useLocation } from "react-router-dom";

const Navigation = () => {
  const encodedToken = localStorage.getItem("token");
  const location = useLocation();

  return (
    <header className="header">
      <div className="navbar-container">
        <NavLink className="navbar" to="/">
          <h1 className="navbar-m-lr-1">LUCENT VIDEO</h1>
        </NavLink>
        {!encodedToken && (
          <NavLink
            className="navbar navbar-m-left-auto"
            to="/sign-in"
            state={{ from: location }}
          >
            <h5 className="navbar-m-lr-1">LOGIN</h5>
          </NavLink>
        )}
        {encodedToken && (
          <NavLink
            className="navbar navbar-m-left-auto"
            to="/logout"
            onClick={() => localStorage.clear()}
          >
            <h5 className="navbar-m-lr-1">LOGOUT</h5>
          </NavLink>
        )}
      </div>
    </header>
  );
};

export { Navigation };
