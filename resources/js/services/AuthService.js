import Axios from "axios";

/**
 * checkIfAuthenticated()
 *
 * Check if any route is authenticated or not
 */
export const checkIfAuthenticated = () => {
  const getLoginData = localStorage.getItem("loginData");
  if (getLoginData != null) {
    const data = JSON.parse(getLoginData);
    if (data.success && data.access_token !== null) {
      return data.user;
    }
    return false;
  }
  return false;
};

/**
 * registerUser()
 *
 * @param {object} data
 */
export const registerUser = async (data) => {
  return await Axios.post(
    "http://localhost:8200/myTask/api/auth/register",
    data
  ).then((res) => {
    return res.data;
  });
};

/**
 * loginUser()
 *
 * @param {object} data
 */
export const loginUser = async (data) => {
  return await Axios.post(
    "http://localhost:8200/myTask/api/auth/login",
    data
  ).then((res) => {
    return res.data;
  });
};
