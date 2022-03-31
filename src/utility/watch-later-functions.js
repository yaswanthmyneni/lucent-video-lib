import axios from "axios";

const addToWatchLater = async (
  watchLaterData,
  setVideoList,
  watchLaterDispatch
) => {
  try {
    const response = await axios({
      method: "post",
      url: "/api/user/watchlater",
      headers: { authorization: localStorage.getItem("token") },
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
      setVideoList((prev) =>
        [...prev].map((videoData) => {
          if (videoData._id === watchLaterData._id) {
            return { ...videoData, watchLater: true };
          }
          return { ...videoData };
        })
      );
    }
  } catch (error) {
    console.error(error);
  }
};

const removeFromWatchLater = async (id, setVideoList, watchLaterDispatch) => {
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
  }
};

export { addToWatchLater, removeFromWatchLater };
