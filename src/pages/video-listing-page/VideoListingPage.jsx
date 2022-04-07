import "./video-listing-page.css";
import {
  useHistoryContext,
  useLikesContext,
  usePlaylistContext,
  useToastContext,
  useVideoListingContext,
  useWatchLaterContext,
} from "context";
import { AsideBar, PlaylistModal, VideoCard } from "components";
import {
  addToHistory,
  addVideoToRespectivePlaylist,
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

  // from history context
  const {
    historyState: { historyList },
    historyDispatch,
  } = useHistoryContext();

  // from playlist context
  const { playlistState, playlistDispatch } = usePlaylistContext();
  const { playlists, playlistName, playlistId, showPlaylistModal, videoData } =
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
              addToHistory={() =>
                addToHistory(
                  videoData,
                  historyList,
                  historyDispatch,
                  navigate,
                  toastDispatch
                )
              }
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
            createPlaylist={() =>
              createPlaylist(
                playlistName,
                playlistDispatch,
                playlists,
                toastDispatch,
                navigate,
                location
              )
            }
            addVideoToRespectivePlaylist={() =>
              addVideoToRespectivePlaylist(
                videoData,
                playlistId,
                playlists,
                playlistDispatch,
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
