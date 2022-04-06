import axios from "axios";

const submitSignInDetails = async (
  event,
  email,
  password,
  navigate,
  encodedToken
) => {
  try {
    event.preventDefault();
    if (encodedToken) {
      return console.log("already logged in");
    }
    const response = await axios.post("/api/auth/login", {
      email: email,
      password: password,
    });
    if (response.status === 200) {
      localStorage.setItem("token", response.data.encodedToken);
      navigate("/");
    }
  } catch (error) {
    console.error(error);
  }
};

const submitSignUpDetails = async (
  event,
  email,
  password,
  firstName,
  lastName,
  navigate,
  encodedToken
) => {
  try {
    event.preventDefault();
    const regexForEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

    if (encodedToken) {
      return console.log("already logged in");
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
      }

    } else {
      // TODO - add toast here
      console.log("Enter proper email format!");
    }
  } catch (error) {
    console.error(error);
  }
};

export { submitSignInDetails, submitSignUpDetails };
