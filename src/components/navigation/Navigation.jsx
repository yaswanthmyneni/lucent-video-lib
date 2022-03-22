import "./navigation.css";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <header className="header">
      <div className="navbar-container">
        <NavLink className="navbar" to="/">
          <h1 className="navbar-m-lr-1">LUCENT VIDEO</h1>
        </NavLink>
        <NavLink className="navbar navbar-m-left-auto" to="/signin">
          <h5 className="navbar-m-lr-1">LOGIN</h5>
        </NavLink>
      </div>
    </header>
  );
};

export { Navigation };
