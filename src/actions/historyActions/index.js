import api from "../../api/";
export const createHistory = (data) => {
  api.post("/history/create", data);
};
