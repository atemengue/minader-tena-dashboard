import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
} from "@coreui/react";
import { faArrowLeft, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useMutation } from "react-query";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { createHistory } from "../../../actions/historyActions";
import { createPersonnel } from "../../../actions/personnelActions";
import NewPersonnel from "../../../common/NewPersonnel";

const Etape5 = ({
  personnel,
  location,
  structures,
  grades,
  previousStep,
  createPersonnel,
  photoData,
  photo,
  isLoading,
  profile,
}) => {
  const { photoUrl } = photo;
  let history = useHistory();

  const onSave = () => {
    createPersonnel(personnel, photoData)
      .then((response) => {
        // createHistoryMutation.mutate({
        //   userIdUser: profile.idUser,
        //   action: "create",
        //   table: "personnels",
        //   data: response.data,
        // });
        history.goBack();
        toast.success("Mise a jour du personnel Validée");
      })
      .catch((error) => {
        toast.error("Erreur: Verifiez les champs");
      });
  };

  const createHistoryMutation = useMutation((data) => createHistory(data));

  return (
    <>
      <CCard>
        <CCardHeader className="d-flex justify-content-between">
          <h4>Etape 5: Vérifications et Validations informations Finales</h4>
        </CCardHeader>
        <CCardBody>
          <NewPersonnel
            personnel={personnel}
            location={location}
            structures={structures}
            grades={grades}
            photoUrl={photoUrl}
          />
        </CCardBody>
        <CCardFooter className="d-flex justify-content-around">
          <CButton onClick={previousStep} size="md" color="primary">
            <FontAwesomeIcon icon={faArrowLeft} size="md" /> Etape 4
          </CButton>
          {isLoading ? (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <CButton onClick={onSave} size="md" color="success">
              <FontAwesomeIcon icon={faUserPlus} size="md" /> Creer Personnel
            </CButton>
          )}
        </CCardFooter>
      </CCard>
    </>
  );
};

const mapDispatchToProps = {
  createPersonnel,
};

const mapStateToProps = ({ personnelState, userState }) => ({
  photoData: personnelState.newPersonnelPhoto,
  isLoading: personnelState.isLoadingCreate,
  profile: userState.profile,
});

export default connect(mapStateToProps, mapDispatchToProps)(Etape5);
