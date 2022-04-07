import axios from "axios";
import { v4 as uuid } from "uuid";

const submitSignInDetails = async (
  event,
  email,
  password,
  navigate,
  encodedToken,
  toastDispatch
) => {
  try {
    event.preventDefault();
    if (encodedToken) {
      return toastDispatch({
        type: "ADD_TOAST",
        payload: {
          id: uuid(),
          className: "toast-error",
          message: "already logged in",
        },
      });
    }
    const response = await axios.post("/api/auth/login", {
      email: email,
      password: password,
    });
    if (response.status === 200) {
      localStorage.setItem("token", response.data.encodedToken);
      navigate("/");
      toastDispatch({
        type: "ADD_TOAST",
        payload: {
          id: uuid(),
          className: "toast-success",
          message: "logged in successfully",
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

const submitSignUpDetails = async (
  event,
  email,
  password,
  firstName,
  lastName,
  navigate,
  encodedToken,
  toastDispatch
) => {
  try {
    event.preventDefault();
    const regexForEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

    if (encodedToken) {
      return toastDispatch({
        type: "ADD_TOAST",
        payload: {
          id: uuid(),
          className: "toast-error",
          message: "already logged in",
        },
      });
    }

    if (regexForEmail.test(email)) {
      const response = await axios.post("/api/auth/signup", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });

      if (response.status === 201) {
        localStorage.setItem("token", response.data.encodedToken);
        navigate("/");
        toastDispatch({
          type: "ADD_TOAST",
          payload: {
            id: uuid(),
            className: "toast-success",
            message: "signed up successfully",
          },
        });
      }
    } else {
      // TODO - add toast here
      console.log("Enter proper email format!");
      toastDispatch({
        type: "ADD_TOAST",
        payload: {
          id: uuid(),
          className: "toast-warning",
          message: "Enter proper email format!",
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

export { submitSignInDetails, submitSignUpDetails };
