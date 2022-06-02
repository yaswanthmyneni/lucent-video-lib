import { MdDelete } from "assets/icons/icons";
import { useNavigate } from "react-router-dom";
import { BsFillPlayBtnFill } from "assets/icons/icons";

const HistoryCard = ({ cardData, removeFromHistory }) => {
  const { _id, title, image } = cardData;

  // from react-router-dom
  const navigate = useNavigate();

  return (
    <section className="video-card-container card-pos-rel">
      <div className="video-card-image-container modal-pos-rel">
        <img className="image-resp" src={image} alt={title} />
        <div
          className="img-modal-container"
          onClick={() => navigate(`/video/${_id}`)}
        >
          <div className="modal-bg img-modal-bg"></div>
          <div className="video-card-modal">
            <BsFillPlayBtnFill className="play-icon" />
          </div>
        </div>
      </div>
      <div className="card-margin">
        <div className="flex video-card-flex-adjustment">
          <h5>{title}</h5>
          <MdDelete
            className="video-card-icon cursor color-red"
            onClick={removeFromHistory}
          />
        </div>
        <small className="text-gray">6k views | 4 hours ago</small>
      </div>
    </section>
  );
};

export { HistoryCard };
