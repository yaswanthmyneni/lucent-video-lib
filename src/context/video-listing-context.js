import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const VideoListing = createContext();
const useVideoListingContext = () => useContext(VideoListing);

const VideoListingProvider = ({ children }) => {
  const [videoList, setVideoList] = useState([]);

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
      }
    })();
  }, []);

  const value = { videoList, setVideoList };

  return (
    <VideoListing.Provider value={value}>{children}</VideoListing.Provider>
  );
};

export { useVideoListingContext, VideoListingProvider };
