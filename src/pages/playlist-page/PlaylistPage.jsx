import { AsideBar, PlaylistCard, PlaylistModal } from "components";
import { usePlaylistContext, useToastContext } from "context";
import { createPlaylist, deletePlaylist } from "utility";
import "./playlist-page.css";

const PlaylistPage = () => {
  // from playlist context
  const { playlistState, playlistDispatch } = usePlaylistContext();
  const { playlists, playlistName, showPlaylistModal } = playlistState;

  // from toast context
  const { toastDispatch } = useToastContext();

  const playlistPage = true;

  return (
    <div className="page-wrapper">
      <AsideBar />
      <main className="playlist-page-main">
        <div className="flex">
          <h3>Playlists</h3>
          <button
            className="btn btn-primary playlist-btn"
            onClick={() =>
              playlistDispatch({
                type: "SHOW_PLAYLIST_MODAL",
                payload: true,
              })
            }
          >
            create playlist
          </button>
        </div>
        <div className="playlist-container">
          {playlists.map((playlist) => {
            return (
              <PlaylistCard
                key={playlist._id}
                playlist={playlist}
                deletePlaylist={() =>
                  deletePlaylist(playlist._id, playlistDispatch, toastDispatch)
                }
              />
            );
          })}
        </div>
        {showPlaylistModal && (
          <PlaylistModal
            createPlaylist={() =>
              createPlaylist(
                playlistName,
                playlistDispatch,
                playlists,
                toastDispatch
              )
            }
            playlistPage={playlistPage}
          />
        )}
      </main>
    </div>
  );
};

export { PlaylistPage };
