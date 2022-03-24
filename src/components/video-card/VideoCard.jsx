import "./video-card.css";

const VideoCard = ({ videoData: { title, image }, watchLater }) => {
  return (
    <>
      <div className="video-card-container card-pos-rel">
        <i className="fa-solid fa-heart cursor"></i>
        <div className="video-card-image-container">
          <img className="image-resp" src={image} alt={title} />
        </div>
        <div className="card-margin">
          <h5 className="card-margin-0">{title}</h5>
          <small className="text-gray">6k views | 4 hours ago</small>
        </div>
        <button className="btn btn-primary m-b-4px">Watch Now</button>
        <button className={watchLater ? `btn btn-danger` : `btn btn-primary`}>
          {watchLater ? "Remove from watch later" : "Watch later"}
        </button>
      </div>
    </>
  );
};

export { VideoCard };
