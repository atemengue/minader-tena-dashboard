import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CTooltip,
} from "@coreui/react";
import {
  faAdjust,
  faAirFreshener,
  faEdit,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchCategories } from "../../actions/configurationActions";
import CategorieModal from "../../common/CategorieModal";
import { fieldsCategorie } from "../../utils/dataTables";

const ConfigurationCategorie = (props) => {
  const [modal, setModal] = useState(false);
  const [categorieDetail, setCategorieDetail] = useState("");

  const toggle = () => {
    setModal(!modal);
  };

  const { categories, fetchCategories } = props;

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, []);

  const onHandleModal = (data) => {
    toggle();
    setCategorieDetail(data);
  };

  return (
    <>
      <CategorieModal modal={modal} toggle={toggle} data={categorieDetail} />
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader className="d-flex justify-content-between">
              <h4> Listes des Categories et ages de retraites </h4>
              <CButton onClick={toggle} color="info">
                <FontAwesomeIcon icon={faAdjust} />
                Ajouter une categorie
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                responsive
                itemsPerPage={10}
                itemsPerPageSelect={10}
                pagination
                fields={fieldsCategorie}
                hover
                items={categories}
                sorter
                tableFilter
                columnFilter
                clickableRows
                striped
                bordered
                scopedSlots={{
                  Numero: (item, index) => <td>{index}</td>,
                  actions: (item, index) => {
                    return (
                      <td className="py-2">
                        <div className="d-flex justify-content-between">
                          <CTooltip content="Voir et Modifier">
                            <CButton
                              onClick={() => onHandleModal(item)}
                              color="primary"
                              size="sm"
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </CButton>
                          </CTooltip>
                          <CTooltip
                            content={`Mise a jour des dates de retraite du personnel categorie ${item.idCategorie}`}
                          >
                            <CButton
                              onClick={() => onHandleModal(item)}
                              color="success"
                              size="sm"
                            >
                              <FontAwesomeIcon
                                className="mr-2"
                                icon={faAirFreshener}
                              />
                              Mise a jour
                            </CButton>
                          </CTooltip>

                          <CTooltip content="Supprimer">
                            <CButton color="danger" size="sm">
                              <FontAwesomeIcon icon={faEdit} />
                            </CButton>
                          </CTooltip>
                        </div>
                      </td>
                    );
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

const mapStateToProps = ({ categorieState }) => {
  return {
    categories: categorieState.categories,
  };
};

const mapDispatchToProps = {
  fetchCategories,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigurationCategorie);
