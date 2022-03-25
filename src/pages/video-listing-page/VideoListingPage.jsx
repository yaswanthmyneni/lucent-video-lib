import "./video-listing-page.css";
import { useVideoListingContext } from "context";
import { AsideBar, VideoCard } from "components";
import { sortByCategory } from "utility";

const VideoListingPage = () => {
  // from video listing context
  const { videoList } = useVideoListingContext();

  // from localStorage
  const categoryName = localStorage.getItem("categoryName");

  // filter function
  const sortedData = sortByCategory(videoList, categoryName);

  return (
    <div className="video-listing-wrapper">
      <AsideBar />

      <main className="video-listing-main">
        <h3>Video Listing Page</h3>
        <div className="video-listing-container">
          {sortedData.map((videoData) => (
            <VideoCard key={videoData._id} videoData={videoData} />
          ))}
        </div>
      </main>
    </div>
  );
};

export { VideoListingPage };
