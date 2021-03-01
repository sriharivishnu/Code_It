import Config from "../../config";
const signInUser = (username_or_email, password) => {
  const body = username_or_email.includes("@")
    ? {
        email: username_or_email,
        password: password,
      }
    : {
        username: username_or_email,
        password: password,
      };
  fetch(Config.backend_api_url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      cache: "no-cache",
    },
    body: JSON.stringify(body),
  });
};
const signUpUser = (username, password, email) => {};

export { signInUser };
export { signUpUser };
