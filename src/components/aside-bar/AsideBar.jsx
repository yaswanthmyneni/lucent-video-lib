import {
  AiFillLike,
  MdPlaylistAdd,
  MdHistory,
  MdOutlineWatchLater,
} from "assets/icons/icons";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import "./aside-bar.css";

const AsideBar = () => {
  return (
    <aside className="aside">
      <div className="aside-div">
        <NavLink
          className={({ isActive }) =>
            clsx("aside-link flex align-items-center gap-8px", {
              "active-color": isActive,
            })
          }
          to="/watch-later"
        >
          <MdOutlineWatchLater className="aside-fa cursor" />
          <p className="m-0">watchlater</p>
        </NavLink>
        <NavLink
          to="/playlist"
          className={({ isActive }) =>
            clsx("aside-link flex align-items-center gap-8px", {
              "active-color": isActive,
            })
          }
        >
          <MdPlaylistAdd className="aside-fa cursor" />
          <p className="m-0">playlist</p>
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            clsx("aside-link flex align-items-center gap-8px", {
              "active-color": isActive,
            })
          }
        >
          <MdHistory className="aside-fa cursor" />
          <p className="m-0">history</p>
        </NavLink>
        <NavLink
          to="/likes"
          className={({ isActive }) =>
            clsx("aside-link flex align-items-center gap-8px", {
              "active-color": isActive,
            })
          }
        >
          <AiFillLike className="aside-fa cursor" />
          <p className="m-0">likes</p>
        </NavLink>
      </div>
    </aside>
  );
};

export { AsideBar };
