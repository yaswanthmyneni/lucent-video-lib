import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

const Playlist = createContext();
const usePlaylistContext = () => useContext(Playlist);

const playlistReducer = (playlistState, { type, payload }) => {
  switch (type) {
    case "PLAYLISTS":
      return {
        ...playlistState,
        playlists: payload,
      };
    case "PLAYLIST_ID":
      return {
        ...playlistState,
        playlistId: payload,
      };
    case "PLAYLIST_NAME":
      return {
        ...playlistState,
        playlistName: payload,
      };
    case "SHOW_PLAYLIST_MODAL":
      return {
        ...playlistState,
        showPlaylistModal: payload,
      };
    case "VIDEO_DATA":
      return {
        ...playlistState,
        videoData: payload,
      };
    case "PLAYLIST_VIDEOS_DATA":
      return {
        ...playlistState,
        playlistVideos: payload,
      };
    default:
      return playlistState;
  }
};

const PlaylistProvider = ({ children }) => {
  const [playlistState, playlistDispatch] = useReducer(playlistReducer, {
    playlists: [],
    playlistId: null,
    playlistName: null,
    showPlaylistModal: false,
    videoData: {},
    playlistVideos: [],
  });

  localStorage.setItem(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJlMzIzZmY2MC1hMTUzLTQ0MTYtYmEyNS0zNDQ0ZGI1NjliOWMiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ._-fah2UEuueLmRHHl5uV4CYhiQdODX6neUkGbfTvtFM"
  );

  useEffect(() => {
    (async () => {
      try {
        const response = await axios({
          method: "get",
          url: "/api/user/playlists",
          headers: { authorization: localStorage.getItem("token") },
        });
        if (response.status === 200) {
          playlistDispatch({
            type: "PLAYLIST",
            payload: response.data.playlists,
          });
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const value = { playlistState, playlistDispatch };

  return <Playlist.Provider value={value}>{children}</Playlist.Provider>;
};

export { usePlaylistContext, PlaylistProvider };
