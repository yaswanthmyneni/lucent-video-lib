import { AsideBar, HistoryCard } from "components";
import { useHistoryContext } from "context";
import { useNavigate } from "react-router-dom";
import { addToHistory, clearAllFromHistory, removeFromHistory } from "utility";
import "./history-page.css";

const HistoryPage = () => {
  // from history context
  const {
    historyState: { historyList },
    historyDispatch,
  } = useHistoryContext();

  // from react-router-dom
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <AsideBar />
      <main className="history-page-main">
        <div className="flex">
          <h3>History</h3>
          <button
            className="btn btn-danger history-btn"
            onClick={() => clearAllFromHistory(historyDispatch)}
          >
            clear all
          </button>
        </div>
        <div className="history-container">
          {historyList.map((historyData) => (
            <HistoryCard
              key={historyData._id}
              btnNameOne="Watch now"
              cardData={historyData}
              removeFromHistory={() =>
                removeFromHistory(historyData._id, historyDispatch)
              }
              addToHistory={() =>
                addToHistory(
                  historyData,
                  historyList,
                  historyDispatch,
                  navigate
                )
              }
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export { HistoryPage };
