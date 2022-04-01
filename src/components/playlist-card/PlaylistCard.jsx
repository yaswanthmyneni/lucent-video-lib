import { MdDelete } from "assets/icons/icons";
import { useNavigate } from "react-router-dom";
import "./playlist-card.css";

const PlaylistCard = ({ playlist, deletePlaylist }) => {
  const {
    title: { playlistName },
  } = playlist;

  const navigate = useNavigate();

  return (
    <>
      <div className="playlist-card-container card-pos-rel">
        <div className="playlist-card-image-container">
          <MdDelete
            className="video-card-icon cursor color-red"
            onClick={deletePlaylist}
          />
          <img
            className="image-resp"
            src="https://i.pinimg.com/originals/ba/98/28/ba9828a5ef5ee11c8fb32151e0cd78f1.jpg"
            alt={playlistName}
          />
        </div>
        <h5 className="color-black">{playlistName}</h5>
        <button
          className="btn btn-primary"
          onClick={() => {
            navigate(`/playlist/${playlist._id}`);
          }}
        >
          show videos
        </button>
      </div>
    </>
  );
};

export { PlaylistCard };
