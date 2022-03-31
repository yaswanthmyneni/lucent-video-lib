import "./watch-later-page.css";
import { VideoCard, AsideBar } from "components";
import {
  useWatchLaterContext,
  useVideoListingContext,
  useHistoryContext,
} from "context";
import { addToHistory, removeFromWatchLater } from "utility";
import { useNavigate } from "react-router-dom";

const WatchLaterPage = () => {
  // from video listing context
  const { setVideoList } = useVideoListingContext();

  // from watch later context
  const {
    watchLaterState: { watchLaterList },
    watchLaterDispatch,
  } = useWatchLaterContext();

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
      <main className="watch-later-page-main">
        <h3>Watch Later</h3>
        <div className="watch-later-container">
          {watchLaterList.map((watchLaterData) => (
            <VideoCard
              key={watchLaterData._id}
              btnNameOne="Watch now"
              cardData={watchLaterData}
              removeFromWatchLater={() =>
                removeFromWatchLater(
                  watchLaterData._id,
                  setVideoList,
                  watchLaterDispatch
                )
              }
              addToHistory={() =>
                addToHistory(
                  watchLaterData,
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

export { WatchLaterPage };
