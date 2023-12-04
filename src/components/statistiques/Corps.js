import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getClassification } from "../../actions/statistiqueActions";

const Corps = (props) => {
  const { getClassification, statistique } = props;

  useEffect(() => {
    if (statistique.length === 0) {
      getClassification();
    }
  }, [statistique, getClassification]);

  const showGradeName = (array) => {
    return array.map((corps) => {
      return <li className="list-group-item">{corps}</li>;
    });
  };

  const showGradeValue = (data) => {
    for (const key in data) {
      const grades = Object.keys(data);
      return grades.map((value) => {
        return (
          <li key={key} className="list-group-item">
            {data[value]}
          </li>
        );
      });
    }
  };

  return (
    <CRow>
      <CCol xs="12" md="12" lg="12">
        <CCard>
          <CCardHeader className="d-flex justify-content-between">
            <h4>Classification du personnels Actifs par corps</h4>
          </CCardHeader>
          <CCardBody>
            {props.statistique.length === 0 ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <div>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Corps</th>
                      <th scope="col">Grade</th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.statistique.map((value, index) => {
                      let corps = Object.keys(value)[0];
                      return (
                        <tr>
                          <td className="font-weight-bold">{corps}</td>
                          <td className="p-0">
                            <ul className="list-group-flush p-0 m-0">
                              {showGradeName(Object.keys(value[corps]))}
                            </ul>
                          </td>
                          <td className="p-0">
                            <ul className="list-group-flush p-0 m-0">
                              {showGradeValue(value[corps])}
                            </ul>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan="2">Total</th>
                      <th>{props.total}</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

const mapStateToProps = ({ statistiqueState }) => ({
  statistique: statistiqueState.classification,
  loading: statistiqueState.loading,
  total: statistiqueState.total,
});

export default connect(mapStateToProps, { getClassification })(Corps);
