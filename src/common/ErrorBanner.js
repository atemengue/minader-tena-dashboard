import { CButton, CCol, CRow } from "@coreui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ERROR_CLOSE } from "../actions/types";

const ErrorBanner = () => {
  const dispatch = useDispatch();
  const { error, isClosed } = useSelector((state) => state.errorState);

  let handleCloseClick = () => {
    dispatch({ type: ERROR_CLOSE });
  };

  return (
    error?.data?.status === "error" &&
    !isClosed && (
      <CRow>
        <CCol xs="12">
          <div
            className="alert alert-danger alert-dismissible fade show p-5"
            role="alert"
          >
            <CButton
              onClick={handleCloseClick}
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </CButton>
            <strong>ERREUR:</strong> {error?.data.message}
          </div>
        </CCol>
      </CRow>
    )
  );
};

export default ErrorBanner;
