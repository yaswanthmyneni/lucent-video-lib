import {
  BsThreeDotsVertical,
  MdWatchLater,
  MdDelete,
} from "assets/icons/icons";
import "./video-card.css";

const VideoCard = ({
  cardData: { title, image, watchLater, history },
  btnNameOne,
  addToHistory,
  removeFromHistory,
  addToWatchLater,
  removeFromWatchLater,
}) => {
  return (
    <>
      <div className="video-card-container card-pos-rel">
        {history ? (
          <MdDelete
            className="video-card-icon cursor color-red"
            onClick={removeFromHistory}
          />
        ) : (
          <MdWatchLater
            className={`video-card-icon cursor ${
              watchLater ? "color-green" : "color-black"
            }`}
            onClick={watchLater ? removeFromWatchLater : addToWatchLater}
          />
        )}
        <div className="video-card-image-container">
          <img className="image-resp" src={image} alt={title} />
        </div>
        <div className="card-margin">
          <div className="flex video-card-flex-adjustment">
            <h5>{title}</h5>
            <BsThreeDotsVertical className="cursor" />
          </div>
          <small className="text-gray">6k views | 4 hours ago</small>
        </div>
        <button className="btn btn-primary m-b-4px" onClick={addToHistory}>
          {btnNameOne}
        </button>
      </div>
    </>
  );
};

export { VideoCard };
