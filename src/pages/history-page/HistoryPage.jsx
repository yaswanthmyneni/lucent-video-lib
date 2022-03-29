import { VideoCard, AsideBar } from "components";
import { useHistoryContext } from "context";
import { useNavigate } from "react-router-dom";
import { addToHistory, removeFromHistory } from "utility";
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
        <h3>History</h3>
        <div className="history-container">
          {historyList.map((historyData) => (
            <VideoCard
              key={historyData._id}
              btnNameOne="Watch now"
              btnNameTwo="Remove from history"
              cardData={historyData}
              removeFromHistory={() =>
                removeFromHistory(historyList, historyData._id, historyDispatch)
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
