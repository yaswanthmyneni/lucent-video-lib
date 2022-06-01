import "./watch-later-page.css";
import { AsideBar, WatchLaterCard } from "components";
import {
  useWatchLaterContext,
  useVideoListingContext,
  useToastContext,
} from "context";
import { removeFromWatchLater } from "utility";
import { useNavigate } from "react-router-dom";

const WatchLaterPage = () => {
  // from video listing context
  const { setVideoList } = useVideoListingContext();

  // from watch later context
  const {
    watchLaterState: { watchLaterList },
    watchLaterDispatch,
  } = useWatchLaterContext();

  // from react-router-dom
  const navigate = useNavigate();

  // from toast context
  const { toastDispatch } = useToastContext();

  return (
    <div className="page-wrapper">
      <AsideBar />
      <main className="watch-later-page-main">
        {watchLaterList.length === 0 ? (
          <div className="text-center">
            <h3>Add videos to the watchlater page</h3>
            <button
              className="btn btn-primary single-playlist-btn "
              onClick={() => navigate("/")}
            >
              back to home
            </button>
          </div>
        ) : (
          <>
            <h3>Watch Later</h3>
            <div className="watch-later-container">
              {watchLaterList.map((watchLaterData) => (
                <WatchLaterCard
                  key={watchLaterData._id}
                  btnNameOne="Watch now"
                  cardData={watchLaterData}
                  removeFromWatchLater={() =>
                    removeFromWatchLater(
                      watchLaterData._id,
                      setVideoList,
                      watchLaterDispatch,
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

export { WatchLaterPage };
