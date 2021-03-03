import { post } from "../../utils/fetch-wrapper";
const signInUser = (username_or_email, password) => {
  const data = username_or_email.includes("@")
    ? {
        email: username_or_email,
        password: password,
      }
    : {
        username: username_or_email,
        password: password,
      };
  post("/auth/signin", data)
    .then((response) => {
      console.log(response);
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("refresh_token", response.refresh_token);
    })
    .catch((err) => {
      console.error(err);
    });
};

const signUpUser = (username, password, email) => {
  const data = {
    username: username,
    email: email,
    password: password,
  };
  post("/auth/register", data)
    .then((response) => {
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("refresh_token", response.refresh_token);
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });
};

export { signInUser, signUpUser };
