const addToWatchLater = (watchLaterData, setVideoList, watchLaterDispatch) => {
  setVideoList((prev) =>
    [...prev].map((videoData) => {
      if (videoData._id === watchLaterData._id) {
        return { ...videoData, watchLater: true };
      }
      return { ...videoData };
    })
  );
  watchLaterDispatch({
    type: "ADD_TO_WATCH_LATER",
    payload: { ...watchLaterData, watchLater: true },
  });
};

const removeFromWatchLater = (
  watchLaterList,
  id,
  setVideoList,
  watchLaterDispatch
) => {
  const filteredWatchLaterList = [...watchLaterList].filter(
    (watchLaterData) => watchLaterData._id !== id
  );
  watchLaterDispatch({
    type: "REMOVE_FROM_WATCH_LATER",
    payload: [...filteredWatchLaterList],
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
