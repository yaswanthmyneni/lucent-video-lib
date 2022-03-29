import { Link } from "react-router-dom";
import "./aside-bar.css";

const AsideBar = () => {
  return (
    <aside className="aside">
      <div className="aside-div">
        <Link to="/watch-later">
          <i className="fa-solid fa-clock aside-fa cursor"></i>
        </Link>
        <Link to="/playlist">
          <i className="fa-solid fa-list aside-fa cursor"></i>
        </Link>
        <Link to="/history">
          <i className="fa-solid fa-clock-rotate-left aside-fa cursor"></i>
        </Link>
      </div>
    </aside>
  );
};

export { AsideBar };
