import { createContext, useContext, useReducer } from "react";

const WatchLater = createContext();
const useWatchLaterContext = () => useContext(WatchLater);

const watchLaterReducer = (watchLaterState, action) => {
  switch (action.type) {
    case "ADD_TO_WATCH_LATER":
      return {
        ...watchLaterState,
        watchLaterList: [...watchLaterState.watchLaterList, action.payload],
      };
    case "REMOVE_FROM_WATCH_LATER":
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

  const value = { watchLaterState, watchLaterDispatch };

  return <WatchLater.Provider value={value}>{children}</WatchLater.Provider>;
};

export { useWatchLaterContext, WatchLaterProvider };
