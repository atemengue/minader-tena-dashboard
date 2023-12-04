import api from "../../api";

// export const fetchAllLocations = (_) => async (dispatch) => {
//   dispatch({ type: FETCH_ALL_LOCATIONS });
//   try {
//     const response = await api.get("/locations");
//     dispatch({ type: FETCH_ALL_LOCATIONS_SUCCESS, payload: response.data });
//   } catch (error) {
//     dispatch({ type: FETCH_ALL_LOCATIONS_FAIL });
//   }
// };

export const fetchAllLocations = async () => await api.get("/locations");
