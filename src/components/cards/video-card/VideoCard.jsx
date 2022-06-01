import {
  BsThreeDotsVertical,
  MdWatchLater,
  MdPlaylistAdd,
  AiFillLike,
} from "assets/icons/icons";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./video-card.css";

const VideoCard = ({
  cardData,
  btnNameOne,
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

  const navigate = useNavigate();
  const location = useLocation();

  const encodedToken = localStorage.getItem("token");
  return (
    <>
      <div className="video-card-container card-pos-rel">
        <AiFillLike
          className={`video-card-icon cursor ${
            isLiked ? "color-green" : "color-black"
          }`}
          onClick={isLiked ? removeFromLikedVideos : addToLikedVideos}
        />
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
                !watchLater &&
                  playlistDispatch({ type: "VIDEO_DATA", payload: cardData });
              }}
            />
          </div>
          <small className="text-gray">6k views | 4 hours ago</small>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate(`/video/${_id}`)}
        >
          {btnNameOne}
        </button>
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
                <MdWatchLater />
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
      </div>
    </>
  );
};

export { VideoCard };
