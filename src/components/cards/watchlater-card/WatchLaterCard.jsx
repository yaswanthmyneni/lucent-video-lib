import { BsThreeDotsVertical, MdOutlineWatchLater } from "assets/icons/icons";
import { useState } from "react";

const WatchLaterCard = ({
  cardData,
  btnNameOne,
  addToHistory,
  removeFromWatchLater,
}) => {
  const { title, image } = cardData;
  const [dropdown, setDropdown] = useState(false);

  const updatedRemoveFromWatchLater = () => {
    removeFromWatchLater();
    setDropdown(!dropdown);
  };

  return (
    <>
      <div className="video-card-container card-pos-rel">
        <div className="video-card-image-container">
          <img className="image-resp" src={image} alt={title} />
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
        <button className="btn btn-primary" onClick={addToHistory}>
          {btnNameOne}
        </button>
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
