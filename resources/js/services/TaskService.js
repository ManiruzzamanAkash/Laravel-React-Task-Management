import Axios from "axios";

export const getTaskList = () => {};

/**
 * storeNewTask()
 *
 * @param {object} data
 */
export const storeNewTask = async (data) => {
  data.project_id = parseInt(data.project_id);

  return await Axios.post("http://localhost:8200/myTask/api/tasks", data).then(
    (res) => {
      return res.data;
    }
  );
};
