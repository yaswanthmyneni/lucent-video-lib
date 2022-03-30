import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

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
    (async () => {
      const response = await axios({
        method: "get",
        url: "/api/user/history",
        headers: { authorization: localStorage.getItem("token") },
      });
      historyDispatch({
        type: "HISTORY",
        payload: response.data.history,
      });
    })();
  }, []);

  const value = { historyState, historyDispatch };

  return <History.Provider value={value}>{children}</History.Provider>;
};

export { useHistoryContext, HistoryProvider };
