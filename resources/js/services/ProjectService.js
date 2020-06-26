import Axios from "axios";

export const getProjectList = () => {};

/**
 * storeNewProject()
 *
 * @param {object} data
 */
export const storeNewProject = async (data) => {
  data.user_id = 1;
  return await Axios.post(
    "http://localhost:8200/myTask/api/projects",
    data
  ).then((res) => {
    return res.data;
  });
};
