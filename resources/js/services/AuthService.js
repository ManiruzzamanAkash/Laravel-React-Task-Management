import Axios from "axios";

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
