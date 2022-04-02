import { createContext, useContext, useReducer, useEffect } from "react";
import { getLikedVideos } from "utility";

const Likes = createContext();
const useLikesContext = () => useContext(Likes);

const likedVideosReducer = (state, { type, payload }) => {
  switch (type) {
    case "LIKED_VIDEOS":
      return { ...state, likedVideos: payload };
    default:
      return state;
  }
};

const LikesProvider = ({ children }) => {
  const [likesState, likesDispatch] = useReducer(likedVideosReducer, {
    likedVideos: [],
  });

  useEffect(() => {
    getLikedVideos(likesDispatch);
  }, []);

  const value = { likesState, likesDispatch };

  return <Likes.Provider value={value}>{children}</Likes.Provider>;
};

export { useLikesContext, LikesProvider };
