import axios from "axios";

const createPlaylist = async (playlistName, playlistDispatch, playlists) => {
  try {
    const encodedToken = localStorage.getItem("token");
    if (encodedToken) {
      if (
        playlists.find(
          (playlist) => playlist.title.playlistName === playlistName
        )
      ) {
        //TODO - add toast here
        return console.log("The name is taken");
      }

      if (playlistName === "") {
        return console.log("Please provide name to the playlist");
      }

      const response = await axios({
        method: "post",
        url: "/api/user/playlists",
        headers: { authorization: encodedToken },
        data: {
          playlist: { title: { playlistName }, description: "bar bar bar" },
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
      }
    } else {
      console.log('please login to create playlist');
    }
  } catch (error) {
    // TODO - toast here
    console.error(error);
  }
};

const addVideoToRespectivePlaylist = async (
  cardData,
  playlistId,
  playlists,
  playlistDispatch
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
      // TODO - toast here
      return console.log("already present in playlist");
    }

    if (response.status === 201) {
      const updatedPlaylists = [...playlists].map((playlist) => {
        if (playlist._id === playlistId) {
          return response.data.playlist;
        }
        return { ...playlist };
      });
      playlistDispatch({ type: "PLAYLISTS", payload: updatedPlaylists });
    }
  } catch (error) {
    // TODO - toast here
    console.error(error);
  }
};

const deletePlaylist = async (id, playlistDispatch) => {
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
    }
  } catch (error) {
    // TODO - toast here
    console.error(error);
  }
};

const removeVideoFromPlaylist = async (
  playlistId,
  videoId,
  playlistDispatch
) => {
  try {
    const response = await axios({
      method: "delete",
      url: `/api/user/playlists/${playlistId}/${videoId}`,
      headers: { authorization: localStorage.getItem("token") },
    });
    if (response.status === 200) {
      playlistDispatch({
        type: "PLAYLIST_VIDEOS_DATA",
        payload: response.data.playlist.videos,
      });
    }
  } catch (error) {
    // TODO - toast here
    console.error(error);
  }
};

const getPlaylistData = async (playlistId, playlistDispatch) => {
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
      }
    }
  } catch (error) {
    // TODO - toast here
    console.error(error);
  }
};

const getPlaylists = async (playlistDispatch) => {
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
