import { MdDelete } from "assets/icons/icons";
import fallbackImage from "assets/images/homemobilescreen.jpeg";
import { useNavigate } from "react-router-dom";
import "./playlist-card.css";

const PlaylistCard = ({ playlist, deletePlaylist }) => {
  const {
    title: { playlistName },
    videos,
  } = playlist;

  // from react-router-dom
  const navigate = useNavigate();

  return (
    <section className="playlist-card-container card-pos-rel">
      <div className="playlist-card-image-container">
        <img
          className="image-resp cursor"
          src={videos[videos?.length - 1]?.image || fallbackImage}
          alt={playlistName}
        />
        <div
          className="img-modal-container"
          onClick={() => navigate(`/playlist/${playlist._id}`)}
        >
          <div className="modal-bg img-modal-bg"></div>
          <div className="video-card-modal modal-text text-xl">
            <p>{videos.length}</p>
            <p className="m-0">Show Videos</p>
          </div>
        </div>
      </div>
      <div className="flex playlist-card-flex-adjustment">
        <h5 className="color-black">{playlistName}</h5>
        <MdDelete
          className="playlist-card-icon cursor color-red"
          onClick={deletePlaylist}
        />
      </div>
    </section>
  );
};

export { PlaylistCard };
