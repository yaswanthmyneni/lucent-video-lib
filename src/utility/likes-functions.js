import axios from "axios";

const getLikedVideos = async (likesDispatch) => {
  try {
    const response = await axios({
      method: "get",
      url: "/api/user/likes",
      headers: { authorization: localStorage.getItem("token") },
    });
    if (response.status === 200) {
      likesDispatch({
        type: "LIKED_VIDEOS",
        payload: response.data.likes,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

const addToLikedVideos = async (
  likedVideoData,
  likesDispatch,
  setVideoList
) => {
  try {
    const response = await axios({
      method: "post",
      url: "/api/user/likes",
      headers: { authorization: localStorage.getItem("token") },
      data: {
        video: likedVideoData,
      },
    });
    if (response.status === 201) {
      const likedVideosData = [...response.data.likes].map((data) => {
        if (data._id === likedVideoData._id) {
          return { ...data, isLiked: true };
        }
        return data;
      });
      likesDispatch({
        type: "LIKED_VIDEOS",
        payload: likedVideosData,
      });
      setVideoList((prev) =>
        [...prev].map((videoData) => {
          if (videoData._id === likedVideoData._id) {
            return { ...videoData, isLiked: true };
          }
          return videoData;
        })
      );
    }
  } catch (error) {
    console.error(error);
  }
};

const removeFromLikedVideos = async (
  dislikedDataId,
  likesDispatch,
  setVideoList
) => {
  try {
    const response = await axios({
      method: "delete",
      url: `/api/user/likes/${dislikedDataId}`,
      headers: { authorization: localStorage.getItem("token") },
    });
    if (response.status === 200) {
      likesDispatch({
        type: "LIKED_VIDEOS",
        payload: response.data.likes,
      });
      setVideoList((prev) =>
        [...prev].map((videoData) => {
          if (videoData._id === dislikedDataId) {
            return { ...videoData, isLiked: false };
          }
          return videoData;
        })
      );
    }
  } catch (error) {
    console.error(error);
  }
};

export { getLikedVideos, addToLikedVideos, removeFromLikedVideos };
