import {
  useLikesContext,
  usePlaylistContext,
  useToastContext,
  useVideoListingContext,
  useWatchLaterContext,
} from "context";
import { useLocation, useNavigate } from "react-router-dom";
import { AiFillLike, MdPlaylistAdd, MdWatchLater } from "assets/icons/icons";
import {
  addToLikedVideos,
  addToWatchLater,
  removeFromLikedVideos,
  removeFromWatchLater,
} from "utility";

const SingleVideoCard = ({ videoData }) => {
  // from react-router-dom
  const navigate = useNavigate();
  const location = useLocation();

  // from playlist context
  const { playlistDispatch } = usePlaylistContext();

  // from watch-later context
  const { watchLaterDispatch } = useWatchLaterContext();

  // from likes context
  const { likesDispatch } = useLikesContext();

  // from toast context
  const { toastDispatch } = useToastContext();

  // from video listing context
  const { setVideoList } = useVideoListingContext();

  const URL = "https://www.youtube.com/embed/";
  const { title, video_url, isLiked, watchLater } = videoData;

  const removeFromLikedVideosFunc = () => {
    removeFromLikedVideos(
      videoData._id,
      likesDispatch,
      setVideoList,
      toastDispatch
    );
  };

  const addToLikedVideosFunc = () => {
    addToLikedVideos(
      videoData,
      likesDispatch,
      setVideoList,
      toastDispatch,
      navigate,
      location
    );
  };

  const removeFromWatchLaterFunc = () => {
    removeFromWatchLater(
      videoData._id,
      setVideoList,
      watchLaterDispatch,
      toastDispatch
    );
  };

  const addToWatchLaterFunc = () => {
    addToWatchLater(
      videoData,
      setVideoList,
      watchLaterDispatch,
      toastDispatch,
      navigate,
      location
    );
  };

  return (
    <div className="video-container">
      <iframe
        className="iframe"
        src={`${URL}${video_url}?rel=0?version=3&loop=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="flex align-items-center title">
        <h4 className=" m-0">{title}</h4>
        <div
          className="cursor m-l-auto flex align-items-center gap-4px m-r-1rem"
          onClick={isLiked ? removeFromLikedVideosFunc : addToLikedVideosFunc}
        >
          <AiFillLike
            className={`video-icon-size ${
              isLiked ? "color-green" : "color-black"
            }`}
          />
          like
        </div>
        <div
          className="cursor flex align-items-center gap-4px m-r-1rem"
          onClick={() =>
            playlistDispatch({
              type: "SHOW_PLAYLIST_MODAL",
              payload: true,
            })
          }
        >
          <MdPlaylistAdd className="video-icon-size" />
          playlist
        </div>
        <div
          className="cursor flex align-items-center gap-4px m-r-1rem"
          onClick={watchLater ? removeFromWatchLaterFunc : addToWatchLaterFunc}
        >
          <MdWatchLater
            className={`video-icon-size ${
              watchLater ? "color-green" : "color-black"
            }`}
          />
          watchlater
        </div>
      </div>
      <p className="m-bt-4px">12M views</p>
    </div>
  );
};

export { SingleVideoCard };
