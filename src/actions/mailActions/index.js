import api from "../../api";

export const mailActions = {
  SET_MAILS: "SET_MAILS",
  SET_PENDIND_MAILS: "SET_PENDING_MAILS",
};

export const sendMail = (data) => async (dispatch) => {
  try {
    const response = api.post("/mail", data);
  } catch (error) {
    // catch error
  }
};

// export const getActions = (dispatch) => {
//   return {
//     sendMail: (data) => sendMail(data)
//   }
// }

// const sendMail = (data) => {
//   return async (dispatch) => {
//     const response = await api.post('/mail');
//     if (response.error) {
//       // gerer une erreurr
//     } else {
//       // gerer le success
//     }
//   }
// }

export const createMail = (data) => api.post("/mail", data);
