import { fetch } from "../utils";
import { BASE_URL } from "~/configs";

const apiService = () => next => action => {
  const result = next(action);
  if (!action.meta || !action.meta.async) {
    return new Promise(resolve => {
      resolve();
      return result;
    });
  }

  const { path, method = "get", body} = action.meta;
  if (!path) {
    throw new Error(`'path' not specified for async action ${action.type}`);
  }

  let url = `${path}`;

  if (path.startsWith("/")) {
    url = `${BASE_URL}${path}`;
  }
  return fetch(url, method, body).then(
    res => handleResponse(res, action, next),
    err => handleErrors(err, action, next)
  );
};

const handleErrors = (err, action, next) => {
  let type = `${action.type}_FAILED`;
  next({
    type,
    payload: err,
    meta: action.meta
  });
  return Promise.reject(typeof err === "string" ? err : "Server Error");
};

const handleResponse = (res, action, next) => {
  next({
    type: `${action.type}_SUCCESS`,
    payload: res,
    meta: action.meta
  });
  return res;
};

export default apiService;
