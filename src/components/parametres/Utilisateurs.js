import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CImg,
  CRow,
} from "@coreui/react";
import { faArrowLeft, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteUserProfil, fetchUsers } from "../../actions/parametreActions";
import { DELETE_USER } from "../../actions/parametreActions/types";
import ConfirmDelete from "../../common/ConfirmDelete";
import { BUCKET_URL } from "../../config";
import { fieldsUtilisateur } from "../../utils/dataTables";

const Utilisateurs = (props) => {
  const { users, fetchUsers } = props;

  const [deleteUser, setDeleteUser] = useState(false);
  const [userData, setUserData] = useState(null);

  // dispatch for redux
  const dispatch = useDispatch();

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers();
    }
  }, [fetchUsers]);

  const toggleModalDeteleUser = (user) => {
    setDeleteUser(!deleteUser);
    setUserData(user);
  };

  const deleteUserMutation = useMutation((idUser) => deleteUserProfil(idUser), {
    onSuccess: (response) => {
      dispatch({
        type: DELETE_USER,
        payload: response.data.idUser,
      });
      toast.success(response.data.message);
    },
    onError: (error) => {
      toast.error("Erreur: Veuillez les champs");
    },
  });

  const onValidatedDeleteProfil = (isValidated) => {
    if (isValidated) {
      deleteUserMutation.mutate(userData?.idUser);
    }
  };

  return (
    <>
      <ConfirmDelete
        type="delete"
        message={`le supprimer les informations ${userData?.noms} - ${userData?.prenoms} `}
        onValidated={onValidatedDeleteProfil}
        modal={deleteUser}
        toggle={toggleModalDeteleUser}
      />

      <CRow>
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

        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader className="d-flex justify-content-between">
              <h4> Listes des Utilisateurs: {users.length} </h4>
              <CButton to={`utilisateurs/creer`} color="info">
                <FontAwesomeIcon icon={faUserPlus} />
                Ajouter un utilisateur
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                itemsPerPage={10}
                fields={fieldsUtilisateur}
                pagination
                items={users}
                hover
                sorter
                tableFilter
                columnFilter
                clickableRows
                striped
                bordered
                scopedSlots={{
                  Numero: (item, index) => <td>{index}</td>,
                  groupe: (item) => (
                    <td>
                      {<CBadge color="warning">{item.role.libelleRole}</CBadge>}
                    </td>
                  ),
                  photo: (item) => (
                    <td>
                      <div className="c-avatar">
                        <CImg
                          src={
                            item.photo
                              ? `${BUCKET_URL}/users/${item.userIdArchive}/${item.photo}`
                              : `${BUCKET_URL}/default/user.png`
                          }
                          className="c-avatar-img"
                          alt="admin@bootstrapmaster.com"
                        />
                      </div>
                    </td>
                  ),
                  actions: (item) => (
                    <td
                      className="py-2"
                      className="d-flex justify-content-between"
                    >
                      <CButton
                        color="primary"
                        variant="outline"
                        shape="square"
                        size="sm"
                        to={`utilisateurs/${item.idUser}`}
                      >
                        Modifier
                      </CButton>
                      <CButton
                        color="danger"
                        variant="outline"
                        shape="square"
                        size="sm"
                        onClick={() => toggleModalDeteleUser(item)}
                      >
                        Supprimer
                      </CButton>
                    </td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

const mapStateToProps = ({ parametreState }) => {
  return {
    users: parametreState.users,
  };
};

const mapDispatchToProps = {
  fetchUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Utilisateurs);
