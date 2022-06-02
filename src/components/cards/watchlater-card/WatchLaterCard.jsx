import { BsThreeDotsVertical, MdOutlineWatchLater } from "assets/icons/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillPlayBtnFill } from "assets/icons/icons";

const WatchLaterCard = ({ cardData, removeFromWatchLater }) => {
  const { _id, title, image } = cardData;
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  const updatedRemoveFromWatchLater = () => {
    removeFromWatchLater();
    setDropdown(!dropdown);
  };

  return (
    <>
      <div className="video-card-container card-pos-rel">
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
            <BsThreeDotsVertical
              className="cursor"
              onClick={() => {
                setDropdown(!dropdown);
              }}
            />
          </div>
          <small className="text-gray">6k views | 4 hours ago</small>
        </div>
        {dropdown && (
          <div className="dropdown">
            <ul className="ul-none dropdown-ul">
              <li
                className="dropdown-li cursor"
                onClick={updatedRemoveFromWatchLater}
              >
                <MdOutlineWatchLater />
                Remove from watchlater
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export { WatchLaterCard };
