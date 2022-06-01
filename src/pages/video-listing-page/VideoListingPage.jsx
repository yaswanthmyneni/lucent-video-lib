import "./video-listing-page.css";
import {
  useLikesContext,
  usePlaylistContext,
  useToastContext,
  useVideoListingContext,
  useWatchLaterContext,
} from "context";
import { AsideBar, PlaylistModal, VideoCard } from "components";
import {
  addToWatchLater,
  createPlaylist,
  removeFromWatchLater,
  sortByCategory,
  addToLikedVideos,
  removeFromLikedVideos,
} from "utility";
import { useLocation, useNavigate } from "react-router-dom";

const VideoListingPage = () => {
  // from video listing context
  const { videoList, setVideoList } = useVideoListingContext();

  // from watch later context
  const { watchLaterDispatch } = useWatchLaterContext();

  // from playlist context
  const { playlistState, playlistDispatch } = usePlaylistContext();
  const { playlists, playlistName, showPlaylistModal, videoData } =
    playlistState;

  // from toast context
  const { toastDispatch } = useToastContext();

  // from liked videos context
  const { likesDispatch } = useLikesContext();

  // from localStorage
  const categoryName = localStorage.getItem("categoryName");

  // filter function
  const sortedData = sortByCategory(videoList, categoryName);

  // from react-router-dom
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="page-wrapper">
      <AsideBar />
      <main className="video-listing-main">
        <h3>Video Listing Page</h3>
        <div className="video-listing-container">
          {sortedData.map((videoData) => (
            <VideoCard
              key={videoData._id}
              cardData={videoData}
              btnNameOne="Watch now"
              btnNameTwo="Watch later"
              removeFromWatchLater={() =>
                removeFromWatchLater(
                  videoData._id,
                  setVideoList,
                  watchLaterDispatch,
                  toastDispatch
                )
              }
              addToWatchLater={() =>
                addToWatchLater(
                  videoData,
                  setVideoList,
                  watchLaterDispatch,
                  toastDispatch,
                  navigate,
                  location
                )
              }
              addToLikedVideos={() =>
                addToLikedVideos(
                  videoData,
                  likesDispatch,
                  setVideoList,
                  toastDispatch,
                  navigate,
                  location
                )
              }
              removeFromLikedVideos={() =>
                removeFromLikedVideos(
                  videoData._id,
                  likesDispatch,
                  setVideoList,
                  toastDispatch
                )
              }
              playlistDispatch={playlistDispatch}
            />
          ))}
        </div>
        {showPlaylistModal && (
          <PlaylistModal
            videoData={videoData}
            createPlaylist={() =>
              createPlaylist(
                playlistName,
                playlistDispatch,
                playlists,
                toastDispatch
              )
            }
          />
        )}
      </main>
    </div>
  );
};

export { VideoListingPage };
