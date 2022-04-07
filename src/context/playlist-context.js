import { createContext, useContext, useReducer, useEffect } from "react";
import { getPlaylists } from "utility";
import { useToastContext } from "./toast-context";

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
    playlistName: "",
    showPlaylistModal: false,
    videoData: {},
    playlistVideos: [],
  });

  // from toast context
  const { toastDispatch } = useToastContext();

  useEffect(() => {
    getPlaylists(playlistDispatch, toastDispatch);
  }, [toastDispatch]);

  const value = { playlistState, playlistDispatch };

  return <Playlist.Provider value={value}>{children}</Playlist.Provider>;
};

export { usePlaylistContext, PlaylistProvider };
