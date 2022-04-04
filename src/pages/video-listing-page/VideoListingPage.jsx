import "./video-listing-page.css";
import {
  useHistoryContext,
  useLikesContext,
  usePlaylistContext,
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
import { useNavigate } from "react-router-dom";

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

  // from liked videos context
  const { likesDispatch } = useLikesContext();

  // from localStorage
  const categoryName = localStorage.getItem("categoryName");

  // filter function
  const sortedData = sortByCategory(videoList, categoryName);

  // from react-router-dom
  const navigate = useNavigate();

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
                addToHistory(videoData, historyList, historyDispatch, navigate)
              }
              removeFromWatchLater={() =>
                removeFromWatchLater(
                  videoData._id,
                  setVideoList,
                  watchLaterDispatch
                )
              }
              addToWatchLater={() =>
                addToWatchLater(videoData, setVideoList, watchLaterDispatch)
              }
              addToLikedVideos={() =>
                addToLikedVideos(videoData, likesDispatch, setVideoList)
              }
              removeFromLikedVideos={() =>
                removeFromLikedVideos(
                  videoData._id,
                  likesDispatch,
                  setVideoList
                )
              }
              playlistDispatch={playlistDispatch}
            />
          ))}
        </div>
        {showPlaylistModal && (
          <PlaylistModal
            createPlaylist={() =>
              createPlaylist(playlistName, playlistDispatch, playlists)
            }
            addVideoToRespectivePlaylist={() =>
              addVideoToRespectivePlaylist(
                videoData,
                playlistId,
                playlists,
                playlistDispatch
              )
            }
          />
        )}
      </main>
    </div>
  );
};

export { VideoListingPage };
