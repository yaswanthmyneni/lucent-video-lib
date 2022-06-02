import {
  BsThreeDotsVertical,
  MdOutlineWatchLater,
  MdPlaylistAdd,
  AiFillLike,
} from "assets/icons/icons";
import { useState } from "react";
import { BsFillPlayBtnFill } from "assets/icons/icons";
import { useLocation, useNavigate } from "react-router-dom";
import "./video-card.css";

const VideoCard = ({
  cardData,
  addToWatchLater,
  removeFromWatchLater,
  playlistDispatch,
  addToLikedVideos,
  removeFromLikedVideos,
}) => {
  const { _id, title, image, watchLater, isLiked } = cardData;
  const [dropdown, setDropdown] = useState(false);

  const updatedRemoveFromWatchLater = () => {
    removeFromWatchLater();
    setDropdown(!dropdown);
  };

  const updatedAddToWatchLater = () => {
    addToWatchLater();
    setDropdown(!dropdown);
  };

  // from react-router-dom
  const navigate = useNavigate();
  const location = useLocation();

  // from localStorage
  const encodedToken = localStorage.getItem("token");

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
          <div className="flex align-items-center gap-8px">
            <AiFillLike
              className={`video-card-icon cursor ${
                isLiked ? "color-green" : "color-black"
              }`}
              onClick={isLiked ? removeFromLikedVideos : addToLikedVideos}
            />
            <BsThreeDotsVertical
              className="cursor"
              onClick={() => {
                setDropdown(!dropdown);
                !watchLater &&
                  playlistDispatch({ type: "VIDEO_DATA", payload: cardData });
              }}
            />
          </div>
        </div>
        <small className="text-gray">6k views | 4 hours ago</small>
      </div>
      {dropdown && (
        <div className="dropdown">
          <ul className="ul-none dropdown-ul">
            <li
              className="dropdown-li cursor"
              onClick={
                watchLater
                  ? updatedRemoveFromWatchLater
                  : updatedAddToWatchLater
              }
            >
              <MdOutlineWatchLater />
              {watchLater ? "Remove from watchlater" : "Add to watchlater"}
            </li>
            <li
              className="dropdown-li cursor"
              onClick={
                encodedToken
                  ? () => {
                      playlistDispatch({
                        type: "SHOW_PLAYLIST_MODAL",
                        payload: true,
                      });
                      setDropdown(!dropdown);
                    }
                  : () => navigate("/sign-in", { state: { from: location } })
              }
            >
              <MdPlaylistAdd /> playlist
            </li>
          </ul>
        </div>
      )}
    </section>
  );
};

export { VideoCard };
