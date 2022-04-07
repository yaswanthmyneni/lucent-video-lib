import { Routes, Route } from "react-router-dom";
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
import { RequireAuth } from "components";

const Routing = () => {
  return (
    <Routes>
      <Route path="*" element={<ErrorPage />} />
      
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/category">
        <Route path="youth-and-truth" element={<VideoListingPage />} />
        <Route path="yoga-sessions" element={<VideoListingPage />} />
        <Route path="yogic-lifestyle" element={<VideoListingPage />} />
      </Route>
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/video">
        <Route path=":video_id" element={<VideoPage />} />
      </Route>
      <Route path="/mockman" element={<MockAPI />} />

      {/* private routes */}
      <Route
        path="/playlist"
        element={
          <RequireAuth>
            <PlaylistPage />
          </RequireAuth>
        }
      />
      <Route
        path="/playlist/:playlistId"
        element={
          <RequireAuth>
            <SinglePlaylistPage />
          </RequireAuth>
        }
      />
      <Route
        path="/likes"
        element={
          <RequireAuth>
            <LikesPage />
          </RequireAuth>
        }
      />
      <Route
        path="/history"
        element={
          <RequireAuth>
            <HistoryPage />
          </RequireAuth>
        }
      />
      <Route
        path="/watch-later"
        element={
          <RequireAuth>
            <WatchLaterPage />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export { Routing };
