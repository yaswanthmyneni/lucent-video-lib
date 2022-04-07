import { createContext, useContext, useReducer, useEffect } from "react";
import { getWatchLaterData } from "utility";
import { useToastContext } from "./toast-context";

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

  // from toast context
  const { toastDispatch } = useToastContext();

  useEffect(() => {
    getWatchLaterData(watchLaterDispatch, toastDispatch);
  }, [toastDispatch]);

  const value = { watchLaterState, watchLaterDispatch };

  return <WatchLater.Provider value={value}>{children}</WatchLater.Provider>;
};

export { useWatchLaterContext, WatchLaterProvider };
