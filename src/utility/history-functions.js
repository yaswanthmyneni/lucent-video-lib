import axios from "axios";

const addToHistory = async (
  videoData,
  historyList,
  historyDispatch,
  navigate
) => {
  try {
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
    if (response.status === 201) {
      historyDispatch({
        type: "HISTORY",
        payload: response.data.history,
      });
      navigate(`/video/${videoData.video_id}`, {
        state: { videoData },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

const removeFromHistory = async (id, historyDispatch) => {
  try {
    const response = await axios({
      method: "delete",
      url: `/api/user/history/${id}`,
      headers: { authorization: localStorage.getItem("token") },
    });

    if (response.status === 200) {
      // const historyTrue = [...response.data.history].map((historyData) => ({
      //   ...historyData,
      //   history: true,
      // }));

      historyDispatch({
        type: "HISTORY",
        payload: response.data.history,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

const clearAllFromHistory = async (historyDispatch) => {
  try {
    const response = await axios({
      method: "delete",
      url: `/api/user/history/all`,
      headers: { authorization: localStorage.getItem("token") },
    });

    if (response.status === 200) {
      historyDispatch({
        type: "HISTORY",
        payload: [...response.data.history],
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export { addToHistory, removeFromHistory, clearAllFromHistory };
