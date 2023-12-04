import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { fetchAllLocations } from "../actions/locationActions";
import {
  FETCH_ALL_LOCATIONS_FAIL,
  FETCH_ALL_LOCATIONS_SUCCESS,
} from "../actions/locationActions/types";

const useLocationAll = () => {
  const dispatch = useDispatch();

  const { isLoading, isError } = useQuery(
    "locations",
    () => fetchAllLocations(),
    {
      onSuccess: (response) => {
        dispatch({ type: FETCH_ALL_LOCATIONS_SUCCESS, payload: response.data });
      },
      onError: (error) => {
        dispatch({ type: FETCH_ALL_LOCATIONS_FAIL });
      },
    }
  );

  return {
    isLoading,
    isError,
  };
};

export default useLocationAll;
