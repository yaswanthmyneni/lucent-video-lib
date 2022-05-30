import axios from "axios";
import { v4 as uuid } from "uuid";

const getLikedVideos = async (likesDispatch, toastDispatch) => {
  try {
    const encodedToken = localStorage.getItem("token");
    if (encodedToken) {
      const response = await axios({
        method: "get",
        url: "/api/user/likes",
        headers: { authorization: encodedToken },
      });
      if (response.status === 200) {
        likesDispatch({
          type: "LIKED_VIDEOS",
          payload: response.data.likes,
        });
      }
    }
  } catch (error) {
    console.error(error);
    toastDispatch({
      type: "ADD_TOAST",
      payload: {
        id: uuid(),
        className: "toast-error",
        message: "error! check console",
      },
    });
  }
};

const addToLikedVideos = async (
  likedVideoData,
  likesDispatch,
  setVideoList,
  toastDispatch,
  navigate,
  location
) => {
  try {
    const encodedToken = localStorage.getItem("token");
    if (encodedToken) {
      const likedVideo = { ...likedVideoData, isLiked: true };
      const response = await axios({
        method: "post",
        url: "/api/user/likes",
        headers: { authorization: localStorage.getItem("token") },
        data: {
          video: likedVideo,
        },
      });
      if (response.status === 201) {
        // const likedVideosData = [...response.data.likes].map((data) => {
        //   if (data._id === likedVideoData._id) {
        //     return { ...data, isLiked: true };
        //   }
        //   return data;
        // });
        likesDispatch({
          type: "LIKED_VIDEOS",
          payload: response.data.likes,
        });
        toastDispatch({
          type: "ADD_TOAST",
          payload: {
            id: uuid(),
            className: "toast-success",
            message: "video added to likes",
          },
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
    } else {
      navigate("/sign-in", { state: { from: location } });
    }
  } catch (error) {
    console.error(error);
    toastDispatch({
      type: "ADD_TOAST",
      payload: {
        id: uuid(),
        className: "toast-error",
        message: "error! check console",
      },
    });
  }
};

const removeFromLikedVideos = async (
  dislikedDataId,
  likesDispatch,
  setVideoList,
  toastDispatch
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
      toastDispatch({
        type: "ADD_TOAST",
        payload: {
          id: uuid(),
          className: "toast-success",
          message: "video removed from likes",
        },
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
    toastDispatch({
      type: "ADD_TOAST",
      payload: {
        id: uuid(),
        className: "toast-error",
        message: "error! check console",
      },
    });
  }
};

export { getLikedVideos, addToLikedVideos, removeFromLikedVideos };
