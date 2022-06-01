import { usePlaylistContext, useToastContext } from "context";
import { RiCloseCircleFill } from "assets/icons/icons";
import "./playlist-modal.css";
import { addVideoToRespectivePlaylist, removeVideoFromPlaylist } from "utility";

const PlaylistModal = ({ videoData, createPlaylist, isPlaylistPage }) => {
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
        {!isPlaylistPage && (
          <div className="modal-div">
            {playlists.map((playlist) => {
              return (
                <div
                  key={playlist._id}
                  className="m-b-4px flex align-items-center"
                >
                  <label className="cursor">
                    <input
                      type="checkbox"
                      checked={playlists.find((singlePlaylist) => {
                        if (singlePlaylist._id === playlist._id) {
                          if (
                            playlist.videos?.find(
                              (video) => video._id === videoData._id
                            )
                          ) {
                            return true;
                          }
                        }
                        return false;
                      }, false)}
                      className="modal-input-checkbox cursor"
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
                            toastDispatch,
                            playlists
                          );
                        }
                      }}
                    />
                    {playlist.title.playlistName}
                  </label>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export { PlaylistModal };
