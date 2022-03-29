const addToHistory = (videoData, historyList, historyDispatch, navigate) => {
  if (historyList.find((historyData) => historyData._id === videoData._id)) {
    console.log("already present in history");
    return navigate(`/video/${videoData.video_id}`, {
      state: { videoData },
    });
  }

  historyDispatch({
    type: "ADD_TO_HISTORY",
    payload: { ...videoData, history: true },
  });
  navigate(`/video/${videoData.video_id}`, {
    state: { videoData },
  });
};

const removeFromHistory = (historyList, id, historyDispatch) => {
  const filteredHistoryList = [...historyList].filter(
    (historyData) => historyData._id !== id
  );

  historyDispatch({
    type: "REMOVE_FROM_HISTORY",
    payload: [...filteredHistoryList],
  });
};

export { addToHistory, removeFromHistory };
