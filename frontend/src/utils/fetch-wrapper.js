import Config from "../config";
import { getResponseError } from "./errors";
const post = async (url, data) => {
  const response = await fetch(Config.backend_api_url + url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify(data),
  });
  const error = getResponseError(response);
  if (error) throw Error(error);
  try {
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
  }
};

const get = async (url, params) => {
  let query = Object.keys(params)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");
  if (query.length > 0) query = "?" + query;
  const response = await fetch(Config.backend_api_url + url + query, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  const error = getResponseError(response);
  if (error) throw Error(error);
  try {
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
  }
};

export { post, get };
