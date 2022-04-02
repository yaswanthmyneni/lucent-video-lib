import { AsideBar, LikesCard } from "components";
import {
  useHistoryContext,
  useLikesContext,
  useVideoListingContext,
} from "context";
import { useNavigate } from "react-router-dom";
import { addToHistory, removeFromLikedVideos } from "utility";

const LikesPage = () => {
  const { setVideoList } = useVideoListingContext();

  // from likes page context
  const {
    likesState: { likedVideos },
    likesDispatch,
  } = useLikesContext();

  // from history context
  const {
    historyState: { historyList },
    historyDispatch,
  } = useHistoryContext();

  // from react-router-dom
  const navigate = useNavigate();

  return (
    <>
      <div className="page-wrapper">
        <AsideBar />
        <div className="playlist-page-main">
          <h3>Liked videos</h3>
          <div className="playlist-container">
            {likedVideos.map((likedVideoData) => (
              <LikesCard
                key={likedVideoData._id}
                cardData={likedVideoData}
                btnNameOne="Watch now"
                addToHistory={() =>
                  addToHistory(
                    likedVideoData,
                    historyList,
                    historyDispatch,
                    navigate
                  )
                }
                removeFromLikedVideos={() =>
                  removeFromLikedVideos(
                    likedVideoData._id,
                    likesDispatch,
                    setVideoList
                  )
                }
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export { LikesPage };
