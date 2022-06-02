import { AsideBar, HistoryCard } from "components";
import { useHistoryContext, useToastContext } from "context";
import { useNavigate } from "react-router-dom";
import { clearAllFromHistory, removeFromHistory } from "utility";
import "./history-page.css";

const HistoryPage = () => {
  // from history context
  const {
    historyState: { historyList },
    historyDispatch,
  } = useHistoryContext();

  // from react-router-dom
  const navigate = useNavigate();

  // from toast context
  const { toastDispatch } = useToastContext();

  return (
    <div className="page-wrapper">
      <AsideBar />
      <main className="history-page-main">
        {historyList.length === 0 ? (
          <div className="text-center">
            <h3>Add videos to the history page</h3>
            <button
              className="btn btn-primary single-playlist-btn "
              onClick={() => navigate("/")}
            >
              back to home
            </button>
          </div>
        ) : (
          <>
            <div className="flex">
              <h3>History</h3>
              <button
                className="btn btn-danger history-btn"
                onClick={() =>
                  clearAllFromHistory(
                    historyList,
                    historyDispatch,
                    toastDispatch
                  )
                }
              >
                clear all
              </button>
            </div>
            <div className="history-container">
              {historyList.map((historyData) => (
                <HistoryCard
                  key={historyData._id}
                  cardData={historyData}
                  removeFromHistory={() =>
                    removeFromHistory(
                      historyData._id,
                      historyDispatch,
                      toastDispatch
                    )
                  }
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export { HistoryPage };
