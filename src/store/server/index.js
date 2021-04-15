import axios from "axios";
// import ENV from 'environment';
// import store from '../';
// import { initUnAuthenticate } from '../actions/session.action';

const host = "https://findoutv1.herokuapp.com/api/v1/";

const axiosInstance = axios.create({
  baseURL: host,
  headers: {
    common: {}
  }
});

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

async function getRecord(url, config) {
  return await axiosInstance.get(url, config);
}

//GET Calls
export function findAll(type) {
  debugger;
  let url = `/${type}`;
  return getRecord(url);
}

export function findRecord(type, id, config = {}) {
  let url = `/${type}`;
  if (!id) {
    throw new Error("'id' not provided");
  } else {
    url = `${url}/${id}`;
  }
  return getRecord(url, config);
}

//Making Query request call
export async function query(type, query = {}, config = {}) {
  let url = `/${type}`;
  if (!query) {
    throw new Error("'query' not available");
  }
  return await axiosInstance.get(url, { params: query, ...config });
}

export async function createRecord(type, payload = {}, config = {}) {
  if (!type) {
    throw new Error("'type' not provided");
  }

  let url = `/${type}`;
  return await axiosInstance.post(url, payload, config);
}

export function updateRecord(type, id, payload = {}) {
  let url;
  if (!type) {
    throw new Error("'type' not provided");
  } else if (!id) {
    throw new Error("'id' not provided");
  }

  url = `${type}/${id}`;
  return axiosInstance.put(url, payload);
}

export async function patch(type, payload = {}, config = {}) {
  return axiosInstance.patch(type, payload, config);
}
