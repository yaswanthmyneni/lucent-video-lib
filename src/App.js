import "./utility.css";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  HistoryPage,
  HomePage,
  MockAPI,
  VideoListingPage,
  VideoPage,
  WatchLaterPage,
  PlaylistPage,
  SinglePlaylistPage,
  ErrorPage,
  LikesPage,
  SignInPage,
  SignUpPage,
  LogoutPage,
} from "pages";
import { Footer, Navigation } from "components";

function App() {
  const location = useLocation();

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/category">
          <Route path="youth-and-truth" element={<VideoListingPage />} />
          <Route path="yoga-sessions" element={<VideoListingPage />} />
          <Route path="yogic-lifestyle" element={<VideoListingPage />} />
        </Route>
        <Route path="/watch-later" element={<WatchLaterPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/playlist" element={<PlaylistPage />} />
        <Route path="/likes" element={<LikesPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/playlist/:playlistId" element={<SinglePlaylistPage />} />
        <Route path="/video">
          <Route path=":video_id" element={<VideoPage />} />
        </Route>
        <Route path="/mockman" element={<MockAPI />} />
      </Routes>

      {location.pathname === "/" && <Footer />}
    </>
  );
}

export default App;
