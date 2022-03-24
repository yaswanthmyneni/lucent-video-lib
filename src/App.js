import "./utility.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { HomePage, MockAPI, VideoListingPage } from "pages";
import { Footer, Navigation } from "components";

function App() {
  const location = useLocation();

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category">
          <Route path="youth-and-truth" element={<VideoListingPage />} />
          <Route path="yoga-sessions" element={<VideoListingPage />} />
          <Route path="yogic-lifestyle" element={<VideoListingPage />} />
        </Route>
        <Route path="/mockman" element={<MockAPI />} />
      </Routes>

      {location.pathname === "/" && <Footer />}
    </>
  );
}

export default App;
