import { createContext, useContext, useReducer } from "react";

const History = createContext();
const useHistoryContext = () => useContext(History);

const HistoryReducer = (historyState, action) => {
  switch (action.type) {
    case "ADD_TO_HISTORY":
      return {
        ...historyState,
        historyList: [...historyState.historyList, action.payload],
      };
    case "REMOVE_FROM_HISTORY":
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

  const value = { historyState, historyDispatch };

  return <History.Provider value={value}>{children}</History.Provider>;
};

export { useHistoryContext, HistoryProvider };
