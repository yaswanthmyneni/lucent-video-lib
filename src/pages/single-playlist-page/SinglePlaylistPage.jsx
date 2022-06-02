import { AsideBar, PlaylistVideoCard } from "components";
import { usePlaylistContext, useToastContext } from "context";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getPlaylistData, removeVideoFromPlaylist } from "utility";
import './single-playlist-btn.css';

const SinglePlaylistPage = () => {
  //from playlist context
  const {
    playlistState: { playlistVideos, playlists },
    playlistDispatch,
  } = usePlaylistContext();

  // from toast context
  const { toastDispatch } = useToastContext();

  // from react-router-dom
  const navigate = useNavigate();
  const { playlistId } = useParams();

  useEffect(() => {
    getPlaylistData(playlistId, playlistDispatch);
    // return () => {
    //   playlistDispatch({
    //     type: "PLAYLIST_VIDEOS_DATA",
    //     payload: [],
    //   });
    // };
  }, [playlistId, playlistDispatch]);

  return (
    <div className="page-wrapper">
      <AsideBar />
      <div className="playlist-page-main">
        {playlistVideos.length === 0 ? (
          <div className="text-center">
            <h3>Add videos to this playlist</h3>
            <button className="btn btn-primary single-playlist-btn " onClick={() => navigate("/")}>
              back to home
            </button>
          </div>
        ) : (
          <>
            <h1>playlist videos</h1>
            <div className="playlist-container">
              {playlistVideos?.map((videoData) => (
                <PlaylistVideoCard
                  key={videoData._id}
                  cardData={videoData}
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
          </>
        )}
      </div>
    </div>
  );
};

export { SinglePlaylistPage };
