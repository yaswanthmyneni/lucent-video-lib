import axios from "axios";

const addToWatchLater = async (
  watchLaterData,
  setVideoList,
  watchLaterDispatch
) => {
  const response = await axios({
    method: "post",
    url: "/api/user/watchlater",
    headers: { authorization: localStorage.getItem("token") },
    data: {
      video: watchLaterData,
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
  watchLaterDispatch({
    type: "WATCH_LATER",
    payload: [
      ...response.data.watchlater.map((item) => {
        return { ...item, watchLater: true };
      }),
    ],
  });
};

const removeFromWatchLater = async (id, setVideoList, watchLaterDispatch) => {
  const response = await axios({
    method: "delete",
    url: `/api/user/watchlater/${id}`,
    headers: { authorization: localStorage.getItem("token") },
  });

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
};

export { addToWatchLater, removeFromWatchLater };
