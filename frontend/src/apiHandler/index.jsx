import axios from "axios";
const serverUrl = "http://localhost:8055/auth";
export const postApiHandler = async (endpoint, user) => {
  const response = await axios.post(serverUrl + endpoint, user);
  return response.data;
};

export const getApiHandler = async (endpoint) => {
  const response = await axios.get(serverUrl + endpoint);
  return response.data;
};

export const userVerifiyHandler = async (endpoint) => {
  const response = await axios.get(serverUrl + endpoint);
  return response;
};
