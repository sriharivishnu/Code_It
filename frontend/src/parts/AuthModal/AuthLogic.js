import Config from "../../config";
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
  fetch(Config.backend_api_url + "auth/signin", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      cache: "no-cache",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log("Error when signing in user ", err);
    });
};

const signUpUser = (username, password, email) => {
  const data = {
    username: username,
    email: email,
    password: password,
  };
  fetch(Config.backend_api_url + "auth/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      cache: "no-cache",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error("Error when signing up user ", err);
    });
};

export { signInUser };
export { signUpUser };
