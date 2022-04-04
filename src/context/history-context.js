import { createContext, useContext, useReducer, useEffect } from "react";
import { getHistoryData } from "utility";

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
  const [historyState, historyDispatch] = useReducer(HistoryReducer, {
    historyList: [],
  });

  useEffect(() => {
    getHistoryData(historyDispatch);
  }, []);

  const value = { historyState, historyDispatch };

  return <History.Provider value={value}>{children}</History.Provider>;
};

export { useHistoryContext, HistoryProvider };
