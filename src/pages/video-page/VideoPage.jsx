import "./video-page.css";
import { useParams } from "react-router-dom";
import { AsideBar, PlaylistModal, SingleVideoCard } from "components";
import {
  usePlaylistContext,
  useToastContext,
  useVideoListingContext,
} from "context";
import { createPlaylist } from "utility";

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

  const videoData = videoList.filter((videoData) => videoData._id === video_id);

  return (
    <div className="page-wrapper">
      <AsideBar />
      <main className="video-main">
        <h1>Video</h1>
        <SingleVideoCard videoData={videoData[0]}/>
      </main>
      {showPlaylistModal && (
        <PlaylistModal
          videoData={videoData[0]}
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
