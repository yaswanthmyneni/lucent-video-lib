import { createContext, useContext, useReducer, useEffect } from "react";
import { getHistoryData } from "utility";
import { useToastContext } from "./toast-context";

const History = createContext();
const useHistoryContext = () => useContext(History);

const HistoryReducer = (historyState, action) => {
  switch (action.type) {
    case "HISTORY":
      return {
        ...historyState,
        historyList: action.payload,
      };
    default:
      return historyState;
  }
};

const HistoryProvider = ({ children }) => {
  // from toast context
  const { toastDispatch } = useToastContext();

  const [historyState, historyDispatch] = useReducer(HistoryReducer, {
    historyList: [],
  });

  useEffect(() => {
    getHistoryData(historyDispatch, toastDispatch);
  }, [toastDispatch]);

  const value = { historyState, historyDispatch };

  return <History.Provider value={value}>{children}</History.Provider>;
};

export { useHistoryContext, HistoryProvider };
