import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useToastContext } from "./toast-context";
import { v4 as uuid } from "uuid";

const VideoListing = createContext();
const useVideoListingContext = () => useContext(VideoListing);

const VideoListingProvider = ({ children }) => {
  const [videoList, setVideoList] = useState([]);

  // from toast context
  const { toastDispatch } = useToastContext();

  // getting videos data
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/videos");
        if (response.status === 200) {
          setVideoList(response.data.videos);
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
    })();
  }, [toastDispatch]);

  const value = { videoList, setVideoList };

  return (
    <VideoListing.Provider value={value}>{children}</VideoListing.Provider>
  );
};

export { useVideoListingContext, VideoListingProvider };
