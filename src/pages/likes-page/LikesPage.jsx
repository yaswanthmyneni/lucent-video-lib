import { AsideBar, LikesCard } from "components";
import {
  useLikesContext,
  useToastContext,
  useVideoListingContext,
} from "context";
import { useNavigate } from "react-router-dom";
import { removeFromLikedVideos } from "utility";

const LikesPage = () => {
  const { setVideoList } = useVideoListingContext();

  // from likes page context
  const {
    likesState: { likedVideos },
    likesDispatch,
  } = useLikesContext();

  // from react-router-dom
  const navigate = useNavigate();

  // from toast context
  const { toastDispatch } = useToastContext();

  return (
    <>
      <div className="page-wrapper">
        <AsideBar />
        <div className="playlist-page-main">
          {likedVideos.length === 0 ? (
            <div className="text-center">
              <h3>Add videos to the Likes page</h3>
              <button
                className="btn btn-primary single-playlist-btn "
                onClick={() => navigate("/")}
              >
                back to home
              </button>
            </div>
          ) : (
            <>
              <h3>Liked videos</h3>
              <div className="playlist-container">
                {likedVideos.map((likedVideoData) => (
                  <LikesCard
                    key={likedVideoData._id}
                    cardData={likedVideoData}
                    removeFromLikedVideos={() =>
                      removeFromLikedVideos(
                        likedVideoData._id,
                        likesDispatch,
                        setVideoList,
                        toastDispatch
                      )
                    }
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export { LikesPage };
