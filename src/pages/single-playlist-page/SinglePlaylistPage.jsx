import { AsideBar, PlaylistVideoCard } from "components";
import {
  useHistoryContext,
  usePlaylistContext,
  useToastContext,
} from "context";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  addToHistory,
  getPlaylistData,
  removeVideoFromPlaylist,
} from "utility";

const SinglePlaylistPage = () => {
  //from playlist context
  const {
    playlistState: { playlistVideos },
    playlistDispatch,
  } = usePlaylistContext();

  // from history context
  const {
    historyState: { historyList },
    historyDispatch,
  } = useHistoryContext();

  // from toast context
  const { toastDispatch } = useToastContext();

  // from react-router-dom
  const navigate = useNavigate();
  const { playlistId } = useParams();

  useEffect(() => {
    getPlaylistData(playlistId, playlistDispatch);
    return () => {
      playlistDispatch({
        type: "PLAYLIST_VIDEOS_DATA",
        payload: [],
      });
    };
  }, [playlistId, playlistDispatch]);

  return (
    <div className="page-wrapper">
      <AsideBar />
      <div className="playlist-page-main">
        <h1>playlist videos</h1>
        <div className="playlist-container">
          {playlistVideos?.map((videoData) => (
            <PlaylistVideoCard
              key={videoData._id}
              cardData={videoData}
              btnNameOne="Watch now"
              addToHistory={() =>
                addToHistory(
                  videoData,
                  historyList,
                  historyDispatch,
                  navigate,
                  toastDispatch
                )
              }
              removeVideoFromPlaylist={() =>
                removeVideoFromPlaylist(
                  playlistId,
                  videoData._id,
                  playlistDispatch,
                  toastDispatch
                )
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { SinglePlaylistPage };
