import { AsideBar, PlaylistVideoCard } from "components";
import { usePlaylistContext } from "context";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { addToHistory, getPlaylist, removeVideoFromPlaylist } from "utility";
import "./single-playlist-page.css";

const SinglePlaylistPage = () => {
  //from playlist context
  const {
    playlistState: { playlistVideos },
    playlistDispatch,
  } = usePlaylistContext();

  // from react-router-dom
  const { playlistId } = useParams();

  useEffect(() => {
    getPlaylist(playlistId, playlistDispatch);
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
              addToHistory={addToHistory}
              removeVideoFromPlaylist={() =>
                removeVideoFromPlaylist(
                  playlistId,
                  videoData._id,
                  playlistDispatch
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
