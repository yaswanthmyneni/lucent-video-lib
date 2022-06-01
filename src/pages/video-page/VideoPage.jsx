import "./video-page.css";
import { useParams } from "react-router-dom";
import { AsideBar, PlaylistModal, SingleVideoCard } from "components";
import {
  useHistoryContext,
  usePlaylistContext,
  useToastContext,
  useVideoListingContext,
} from "context";
import { addToHistory, createPlaylist } from "utility";
import { useEffect } from "react";

const VideoPage = () => {
  // from react-router-dom
  const { video_id } = useParams();

  // from playlist context
  const { playlistState, playlistDispatch } = usePlaylistContext();
  const { playlists, playlistName, showPlaylistModal } = playlistState;

  // from toast context
  const { toastDispatch } = useToastContext();

  // from video listing context
  const { videoList } = useVideoListingContext();

  // from history context
  const {
    historyState: { historyList },
    historyDispatch,
  } = useHistoryContext();

  const videoData = videoList.find((videoData) => videoData._id === video_id);

  useEffect(() => {
    if (
      !historyList?.find((historyData) => historyData._id === videoData._id)
    ) {
      addToHistory(videoData, historyList, historyDispatch, toastDispatch);
    }
  }, [videoData, historyList, historyDispatch, toastDispatch]);

  return (
    <div className="page-wrapper">
      <AsideBar />
      <main className="video-main">
        <h1>Video</h1>
        <SingleVideoCard videoData={videoData} />
      </main>
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
    </div>
  );
};

export { VideoPage };
