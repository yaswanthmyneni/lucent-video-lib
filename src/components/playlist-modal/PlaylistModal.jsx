import { usePlaylistContext } from "context";
import { RiCloseCircleFill } from "assets/icons/icons";
import "./playlist-modal.css";

const PlaylistModal = ({ createPlaylist, addVideoToRespectivePlaylist, playList }) => {
  // from playlist context
  const {
    playlistState: { playlists, playlistName },
    playlistDispatch,
  } = usePlaylistContext();

  // from local storage
  const encodedToken = localStorage.getItem("token");
  return (
    <>
      <div className="modal-bg"></div>
      <div className="modal">
        <RiCloseCircleFill
          className="cursor modal-close"
          onClick={() => {
            playlistDispatch({
              type: "SHOW_PLAYLIST_MODAL",
              payload: false,
            });
            playlistDispatch({ type: "PLAYLIST_ID", payload: null });
          }}
        />
        <input
          type="text"
          value={playlistName}
          onChange={(event) =>
            playlistDispatch({
              type: "PLAYLIST_NAME",
              payload: event.target.value,
            })
          }
        />
        <button className="btn btn-primary" onClick={createPlaylist}>
          creat playlist
        </button>
        {!playList && <ul className="ul-none modal-ul">
          {playlists.map((playlist) => {
            return (
              <div
                key={playlist._id}
                className="m-b-4px flex align-items-center"
              >
                <label>
                  <input
                    type="radio"
                    className="modal-input-checkbox"
                    name="playlist"
                    onChange={(event) => {
                      if (event.target.checked) {
                        playlistDispatch({
                          type: "PLAYLIST_ID",
                          payload: playlist._id,
                        });
                      }
                    }}
                  />
                  <li className="cursor modal-li">
                    {playlist.title.playlistName}
                  </li>
                </label>
              </div>
            );
          })}
          {encodedToken && (
            <button
              className="btn btn-primary"
              onClick={addVideoToRespectivePlaylist}
            >
              add to playlist
            </button>
          )}
        </ul>}
      </div>
    </>
  );
};

export { PlaylistModal };
