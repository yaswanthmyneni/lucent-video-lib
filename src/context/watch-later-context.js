import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

const WatchLater = createContext();
const useWatchLaterContext = () => useContext(WatchLater);

const watchLaterReducer = (watchLaterState, action) => {
  switch (action.type) {
    case "WATCH_LATER":
      return {
        ...watchLaterState,
        watchLaterList: action.payload,
      };
    default:
      return watchLaterState;
  }
};

const WatchLaterProvider = ({ children }) => {
  const [watchLaterState, watchLaterDispatch] = useReducer(watchLaterReducer, {
    watchLaterList: [],
  });

  localStorage.setItem(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJlMzIzZmY2MC1hMTUzLTQ0MTYtYmEyNS0zNDQ0ZGI1NjliOWMiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ._-fah2UEuueLmRHHl5uV4CYhiQdODX6neUkGbfTvtFM"
  );

  useEffect(() => {
    (async () => {
      const response = await axios({
        method: "get",
        url: "/api/user/watchlater",
        headers: { authorization: localStorage.getItem("token") },
      });
      watchLaterDispatch({
        type: "WATCH_LATER",
        payload: response.data.watchlater,
      });
    })();
  }, []);

  const value = { watchLaterState, watchLaterDispatch };

  return <WatchLater.Provider value={value}>{children}</WatchLater.Provider>;
};

export { useWatchLaterContext, WatchLaterProvider };
