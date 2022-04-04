import { AiFillLike } from "assets/icons/icons";

const LikesCard = ({ cardData, btnNameOne, addToHistory, removeFromLikedVideos }) => {
  const { title, image } = cardData;

  return (
    <>
      <div className="video-card-container card-pos-rel">
        <AiFillLike
          className="video-card-icon cursor color-green"
          onClick={removeFromLikedVideos}
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
        <button className="btn btn-primary" onClick={addToHistory}>
          {btnNameOne}
        </button>
      </div>
    </>
  );
};

export { LikesCard };
