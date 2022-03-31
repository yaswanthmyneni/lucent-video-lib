import "./video-page.css";
import { useLocation, useParams } from "react-router-dom";
import { AsideBar } from "components";

const VideoPage = () => {
  const URL = "https://www.youtube.com/embed/";
  const { video_id } = useParams();
  const {
    state: {
      videoData: { title },
    },
  } = useLocation();
  return (
    <div className="page-wrapper">
      <AsideBar />
      <main className="video-main">
        <h1>Video</h1>
        <div className="video-container">
          <iframe
            width="848"
            height="477"
            src={`${URL}${video_id}?rel=0?version=3&autoplay=1&loop=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <h4>{title}</h4>
          <p className="m-bt-4px">12M views</p>
        </div>
      </main>
    </div>
  );
};

export { VideoPage };
