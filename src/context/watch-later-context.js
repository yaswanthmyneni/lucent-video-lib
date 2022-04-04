import { createContext, useContext, useReducer, useEffect } from "react";
import { getWatchLaterData } from "utility";

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

  useEffect(() => {
    getWatchLaterData(watchLaterDispatch);
  }, []);

  const value = { watchLaterState, watchLaterDispatch };

  return <WatchLater.Provider value={value}>{children}</WatchLater.Provider>;
};

export { useWatchLaterContext, WatchLaterProvider };
