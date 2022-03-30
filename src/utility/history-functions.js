import axios from "axios";

const addToHistory = async (
  videoData,
  historyList,
  historyDispatch,
  navigate
) => {
  if (historyList.find((historyData) => historyData._id === videoData._id)) {
    console.log("already present in history");
    return navigate(`/video/${videoData.video_id}`, {
      state: { videoData },
    });
  }
  const response = await axios({
    method: "post",
    url: "/api/user/history",
    headers: { authorization: localStorage.getItem("token") },
    data: {
      video: videoData,
    },
  });
  historyDispatch({
    type: "HISTORY",
    payload: [
      ...response.data.history.map((item) => {
        return { ...item, history: true };
      }),
    ],
  });
  navigate(`/video/${videoData.video_id}`, {
    state: { videoData },
  });
};

const removeFromHistory = async (id, historyDispatch) => {
  const response = await axios({
    method: "delete",
    url: `/api/user/history/${id}`,
    headers: { authorization: localStorage.getItem("token") },
  });

  const historyTrue = [...response.data.history].map((historyData) => ({
    ...historyData,
    history: true,
  }));

  historyDispatch({
    type: "HISTORY",
    payload: [...historyTrue],
  });
};

const clearAllFromHistory = async (historyDispatch) => {
  const response = await axios({
    method: "delete",
    url: `/api/user/history/all`,
    headers: { authorization: localStorage.getItem("token") },
  });

  historyDispatch({
    type: "HISTORY",
    payload: [...response.data.history],
  });
};

export { addToHistory, removeFromHistory, clearAllFromHistory };
