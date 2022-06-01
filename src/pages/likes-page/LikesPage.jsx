import { AsideBar, LikesCard } from "components";
import {
  useLikesContext,
  useToastContext,
  useVideoListingContext,
} from "context";
import { removeFromLikedVideos } from "utility";

const LikesPage = () => {
  const { setVideoList } = useVideoListingContext();

  // from likes page context
  const {
    likesState: { likedVideos },
    likesDispatch,
  } = useLikesContext();

  // from toast context
  const { toastDispatch } = useToastContext();

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
        </div>
      </div>
    </>
  );
};

export { LikesPage };
