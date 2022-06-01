import "./watch-later-page.css";
import { AsideBar, WatchLaterCard } from "components";
import {
  useWatchLaterContext,
  useVideoListingContext,
  useToastContext,
} from "context";
import { removeFromWatchLater } from "utility";

const WatchLaterPage = () => {
  // from video listing context
  const { setVideoList } = useVideoListingContext();

  // from watch later context
  const {
    watchLaterState: { watchLaterList },
    watchLaterDispatch,
  } = useWatchLaterContext();

  // from toast context
  const { toastDispatch } = useToastContext();

  return (
    <div className="page-wrapper">
      <AsideBar />
      <main className="watch-later-page-main">
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
      </main>
    </div>
  );
};

export { WatchLaterPage };
