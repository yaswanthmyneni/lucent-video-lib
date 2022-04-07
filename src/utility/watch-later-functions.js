import axios from "axios";
import { v4 as uuid } from "uuid";

const getWatchLaterData = async (watchLaterDispatch, toastDispatch) => {
  try {
    const encodedToken = localStorage.getItem("token");
    if (encodedToken) {
      const response = await axios({
        method: "get",
        url: "/api/user/watchlater",
        headers: { authorization: encodedToken },
      });
      if (response.status === 200) {
        watchLaterDispatch({
          type: "WATCH_LATER",
          payload: response.data.watchlater,
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

const addToWatchLater = async (
  watchLaterData,
  setVideoList,
  watchLaterDispatch,
  toastDispatch,
  navigate,
  location
) => {
  try {
    const encodedToken = localStorage.getItem("token");
    if (encodedToken) {
      const response = await axios({
        method: "post",
        url: "/api/user/watchlater",
        headers: { authorization: encodedToken },
        data: {
          video: watchLaterData,
        },
      });
      if (response.status === 201) {
        watchLaterDispatch({
          type: "WATCH_LATER",
          payload: [
            ...response.data.watchlater.map((item) => {
              return { ...item, watchLater: true };
            }),
          ],
        });
        toastDispatch({
          type: "ADD_TOAST",
          payload: {
            id: uuid(),
            className: "toast-success",
            message: "added to watchlater",
          },
        });
        setVideoList((prev) =>
          [...prev].map((videoData) => {
            if (videoData._id === watchLaterData._id) {
              return { ...videoData, watchLater: true };
            }
            return { ...videoData };
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

const removeFromWatchLater = async (
  id,
  setVideoList,
  watchLaterDispatch,
  toastDispatch
) => {
  try {
    const response = await axios({
      method: "delete",
      url: `/api/user/watchlater/${id}`,
      headers: { authorization: localStorage.getItem("token") },
    });

    if (response.status === 200) {
      const watchLaterTrue = [...response.data.watchlater].map(
        (watchLaterData) => ({
          ...watchLaterData,
          watchLater: true,
        })
      );

      watchLaterDispatch({
        type: "WATCH_LATER",
        payload: [...watchLaterTrue],
      });

      toastDispatch({
        type: "ADD_TOAST",
        payload: {
          id: uuid(),
          className: "toast-success",
          message: "removed from watchlater",
        },
      });

      setVideoList((prev) =>
        [...prev].map((videoData) => {
          if (videoData._id === id) {
            return { ...videoData, watchLater: false };
          }
          return { ...videoData };
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

export { getWatchLaterData, addToWatchLater, removeFromWatchLater };
