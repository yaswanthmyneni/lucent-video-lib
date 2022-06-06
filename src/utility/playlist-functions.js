import axios from "axios";
import { v4 as uuid } from "uuid";

const createPlaylist = async (
  playlistName,
  playlistDispatch,
  playlists,
  toastDispatch
) => {
  try {
    const encodedToken = localStorage.getItem("token");
    if (encodedToken) {
      if (
        playlists.find(
          (playlist) => playlist.title.playlistName === playlistName
        )
      ) {
        return toastDispatch({
          type: "ADD_TOAST",
          payload: {
            id: uuid(),
            className: "toast-warning",
            message: "The playlist name is taken",
          },
        });
      }

      if (playlistName.match(/^\s*$/) !== null) {
        return toastDispatch({
          type: "ADD_TOAST",
          payload: {
            id: uuid(),
            className: "toast-warning",
            message: "enter valid name",
          },
        });
      }

      const response = await axios({
        method: "post",
        url: "/api/user/playlists",
        headers: { authorization: encodedToken },
        data: {
          playlist: { title: { playlistName }, description: "description" },
        },
      });
      if (response.status === 201) {
        playlistDispatch({
          type: "PLAYLISTS",
          payload: response.data.playlists,
        });
        playlistDispatch({
          type: "PLAYLIST_NAME",
          payload: "",
        });
        toastDispatch({
          type: "ADD_TOAST",
          payload: {
            id: uuid(),
            className: "toast-success",
            message: "created playlist successfully",
          },
        });
      }
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
};

const addVideoToRespectivePlaylist = async (
  cardData,
  playlistId,
  playlists,
  playlistDispatch,
  toastDispatch
) => {
  try {
    const response = await axios({
      method: "post",
      url: `/api/user/playlists/${playlistId}`,
      headers: { authorization: localStorage.getItem("token") },
      data: {
        video: cardData,
      },
    });

    if (response.status === 409) {
      return toastDispatch({
        type: "ADD_TOAST",
        payload: {
          id: uuid(),
          className: "toast-warning",
          message: "already present in playlist",
        },
      });
    }

    if (response.status === 201) {
      const updatedPlaylists = [...playlists].map((playlist) => {
        if (playlist._id === playlistId) {
          return response.data.playlist;
        }
        return { ...playlist };
      });
      playlistDispatch({ type: "PLAYLISTS", payload: updatedPlaylists });
      toastDispatch({
        type: "ADD_TOAST",
        payload: {
          id: uuid(),
          className: "toast-success",
          message: "added to playlist",
        },
      });
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
};

const deletePlaylist = async (id, playlistDispatch, toastDispatch) => {
  try {
    const response = await axios({
      method: "delete",
      url: `/api/user/playlists/${id}`,
      headers: { authorization: localStorage.getItem("token") },
    });
    if (response.status === 200) {
      playlistDispatch({
        type: "PLAYLISTS",
        payload: response.data.playlists,
      });
      toastDispatch({
        type: "ADD_TOAST",
        payload: {
          id: uuid(),
          className: "toast-success",
          message: "Deleted playlist successfully",
        },
      });
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
};

const removeVideoFromPlaylist = async (
  playlistId,
  videoId,
  playlistDispatch,
  toastDispatch,
  playlists
) => {
  try {
    const response = await axios({
      method: "delete",
      url: `/api/user/playlists/${playlistId}/${videoId}`,
      headers: { authorization: localStorage.getItem("token") },
    });
    if (response.status === 200) {
      const updatedPlaylists = [...playlists].map((playlist) => {
        if (playlist._id === playlistId) {
          return response.data.playlist;
        }
        return { ...playlist };
      });
      playlistDispatch({ type: "PLAYLISTS", payload: updatedPlaylists });
      playlistDispatch({
        type: "PLAYLIST_VIDEOS_DATA",
        payload: response.data.playlist.videos,
      });
      toastDispatch({
        type: "ADD_TOAST",
        payload: {
          id: uuid(),
          className: "toast-success",
          message: "deleted video from playlist",
        },
      });
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
};

const getPlaylistData = async (
  playlistId,
  playlistDispatch,
  setLoading,
  toastDispatch
) => {
  try {
    const encodedToken = localStorage.getItem("token");
    if (encodedToken) {
      const response = await axios({
        method: "get",
        url: `/api/user/playlists/${playlistId}`,
        headers: { authorization: localStorage.getItem("token") },
      });

      if (response.status === 200) {
        playlistDispatch({
          type: "PLAYLIST_VIDEOS_DATA",
          payload: response.data.playlist?.videos,
        });
        setLoading('');
      }
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
};

const getPlaylists = async (playlistDispatch, toastDispatch) => {
  try {
    const encodedToken = localStorage.getItem("token");
    if (encodedToken) {
      const response = await axios({
        method: "get",
        url: "/api/user/playlists",
        headers: { authorization: encodedToken },
      });
      if (response.status === 200) {
        playlistDispatch({
          type: "PLAYLISTS",
          payload: response.data.playlists,
        });
      }
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
};

export {
  createPlaylist,
  addVideoToRespectivePlaylist,
  deletePlaylist,
  removeVideoFromPlaylist,
  getPlaylistData,
  getPlaylists,
};
