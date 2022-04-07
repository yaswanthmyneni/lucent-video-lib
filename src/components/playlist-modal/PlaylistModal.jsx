import { usePlaylistContext, useToastContext } from "context";
import { RiCloseCircleFill } from "assets/icons/icons";
import "./playlist-modal.css";
import { addVideoToRespectivePlaylist, removeVideoFromPlaylist } from "utility";

const PlaylistModal = ({
  videoData,
  createPlaylist,
  playlistPage,
}) => {
  // from playlist context
  const {
    playlistState: { playlists, playlistName },
    playlistDispatch,
  } = usePlaylistContext();

  // from toast Context
  const { toastDispatch } = useToastContext();
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
        {!playlistPage && (
          <ul className="ul-none modal-ul">
            {playlists.map((playlist) => {
              return (
                <div
                  key={playlist._id}
                  className="m-b-4px flex align-items-center"
                >
                  <label>
                    <input
                      type="checkbox"
                      className="modal-input-checkbox"
                      name="playlist"
                      onChange={(event) => {
                        if (event.target.checked) {
                          addVideoToRespectivePlaylist(
                            videoData,
                            playlist._id,
                            playlists,
                            playlistDispatch,
                            toastDispatch
                          );
                        } else {
                          removeVideoFromPlaylist(
                            playlist._id,
                            videoData._id,
                            playlistDispatch,
                            toastDispatch
                          );
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
          </ul>
        )}
      </div>
    </>
  );
};

export { PlaylistModal };
