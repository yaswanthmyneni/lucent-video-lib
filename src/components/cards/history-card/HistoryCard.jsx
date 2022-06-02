import { MdDelete } from "assets/icons/icons";
import { useNavigate } from "react-router-dom";

const HistoryCard = ({ cardData, btnNameOne, removeFromHistory }) => {
  const { _id, title, image } = cardData;

  // from react-router-dom
  const navigate = useNavigate();

  return (
    <section className="video-card-container card-pos-rel">
      <MdDelete
        className="video-card-icon cursor color-red"
        onClick={removeFromHistory}
      />
      <div className="video-card-image-container">
        <img className="image-resp" src={image} alt={title} />
      </div>
      <div className="card-margin">
        <div className="flex video-card-flex-adjustment">
          <h5>{title}</h5>
        </div>
        <small className="text-gray">6k views | 4 hours ago</small>
      </div>
      <button
        className="btn btn-primary"
        onClick={() => navigate(`/video/${_id}`)}
      >
        {btnNameOne}
      </button>
    </section>
  );
};

export { HistoryCard };
