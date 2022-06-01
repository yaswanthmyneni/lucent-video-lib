import { AsideBar, PlaylistVideoCard } from "components";
import { usePlaylistContext, useToastContext } from "context";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getPlaylistData, removeVideoFromPlaylist } from "utility";

const SinglePlaylistPage = () => {
  //from playlist context
  const {
    playlistState: { playlistVideos, playlists },
    playlistDispatch,
  } = usePlaylistContext();

  // from toast context
  const { toastDispatch } = useToastContext();

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
              removeVideoFromPlaylist={() =>
                removeVideoFromPlaylist(
                  playlistId,
                  videoData._id,
                  playlistDispatch,
                  toastDispatch,
                  playlists
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
