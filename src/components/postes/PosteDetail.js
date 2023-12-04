import { CButton, CCol } from "@coreui/react";
import { faArrowLeft, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchPoste } from "../../actions/posteActions";
import DetailPoste from "../../common/DetailPoste";

const PosteDetail = (props) => {
  const idPoste = props.match.params.idPoste;
  const { fetchPoste, poste } = props;

  useEffect(() => {
    fetchPoste(idPoste);
  }, [idPoste, fetchPoste]);
  return (
    <>
      <div className="d-flex justify-content-between">
        <CCol col="2" sm="6" md="2" className="mb-3">
          <CButton
            onClick={() => props.history.goBack()}
            block
            size="sm"
            color="dark"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Retour
          </CButton>
        </CCol>
        <div>
          <CButton
            size="sm"
            to={`/postes/details/${idPoste}/modifier`}
            color="dark"
            style={{ color: "white" }}
          >
            <FontAwesomeIcon className="mr-2" icon={faEdit} />
            Modifier les informations
          </CButton>
        </div>
      </div>
      <DetailPoste poste={poste} />
    </>
  );
};

const mapStateToProps = ({ posteState }) => ({
  poste: posteState.poste,
});

export default connect(mapStateToProps, { fetchPoste })(PosteDetail);
