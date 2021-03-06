import axios from "axios";
import { v4 as uuid } from "uuid";

const getHistoryData = async (historyDispatch, toastDispatch) => {
  try {
    const encodedToken = localStorage.getItem("token");
    if (encodedToken) {
      const response = await axios({
        method: "get",
        url: "/api/user/history",
        headers: { authorization: encodedToken },
      });
      if (response.status === 200) {
        historyDispatch({
          type: "HISTORY",
          payload: response.data.history,
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

const addToHistory = async (
  videoData,
  historyList,
  historyDispatch,
  toastDispatch
) => {
  try {
    const encodedToken = localStorage.getItem("token");
    if (encodedToken) {
      const response = await axios({
        method: "post",
        url: "/api/user/history",
        headers: { authorization: encodedToken },
        data: {
          video: videoData,
        },
      });
      if (response.status === 201) {
        historyDispatch({
          type: "HISTORY",
          payload: response.data.history,
        });
        toastDispatch({
          type: "ADD_TOAST",
          payload: {
            id: uuid(),
            className: "toast-success",
            message: "Added to history",
          },
        });
      }
    } else {
      toastDispatch({
        type: "ADD_TOAST",
        payload: {
          id: uuid(),
          className: "toast-warning",
          message: "login to store video in history",
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

const removeFromHistory = async (id, historyDispatch, toastDispatch) => {
  try {
    const response = await axios({
      method: "delete",
      url: `/api/user/history/${id}`,
      headers: { authorization: localStorage.getItem("token") },
    });

    if (response.status === 200) {
      historyDispatch({
        type: "HISTORY",
        payload: response.data.history,
      });
      toastDispatch({
        type: "ADD_TOAST",
        payload: {
          id: uuid(),
          className: "toast-success",
          message: "removed from history",
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

const clearAllFromHistory = async (
  historyList,
  historyDispatch,
  toastDispatch
) => {
  try {
    if (historyList.length > 0) {
      const response = await axios({
        method: "delete",
        url: `/api/user/history/all`,
        headers: { authorization: localStorage.getItem("token") },
      });
      if (response.status === 200) {
        historyDispatch({
          type: "HISTORY",
          payload: response.data.history,
        });
        toastDispatch({
          type: "ADD_TOAST",
          payload: {
            id: uuid(),
            className: "toast-success",
            message: "cleared all!",
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

export { getHistoryData, addToHistory, removeFromHistory, clearAllFromHistory };
