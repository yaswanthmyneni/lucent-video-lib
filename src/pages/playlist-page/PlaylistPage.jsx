import { AsideBar, PlaylistCard } from "components";
import { usePlaylistContext } from "context";
import { deletePlaylist } from "utility";
import "./playlist-page.css";

const PlaylistPage = () => {
  const {
    playlistState: { playlists },
    playlistDispatch,
  } = usePlaylistContext();

  return (
    <div className="page-wrapper">
      <AsideBar />
      <main className="playlist-page-main">
        <h1>Playlists</h1>
        <div className="playlist-container">
          {playlists.map((playlist) => {
            return (
              <PlaylistCard
                key={playlist._id}
                playlist={playlist}
                deletePlaylist={() =>
                  deletePlaylist(playlist._id, playlistDispatch)
                }
              />
            );
          })}
        </div>
      </main>
    </div>
  );
};

export { PlaylistPage };
