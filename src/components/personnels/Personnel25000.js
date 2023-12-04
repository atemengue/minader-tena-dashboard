import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CFormGroup,
  CInputCheckbox,
  CLabel,
  CRow,
  CSelect,
  CTooltip,
} from "@coreui/react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchCategories } from "../../actions/configurationActions";
import { fetchPersonnel25000jeunes } from "../../actions/personnelActions";
import { fetchPositions } from "../../actions/positionActions";
import CollapseFied from "../../common/CollapseField";
import ExportButton from "../../common/ExportButton";
import Can from "../../RBAC/Can";
import {
  fields25000,
  getBadge,
  getCategorie,
  getPosition,
} from "../../utils/dataTables";
import { calculateAge } from "../../utils/functions";

const Personnel25000 = (props) => {
  const {
    fetchPersonnel25000jeunes,
    actifs,
    profile,
    isLoading,
    fetchCategories,
    categories,
  } = props;

  const [collapse, setCollapse] = useState(false);
  const [categorie, setCategorie] = useState("");
  const [position, setPosition] = useState("");
  const [name, setName] = useState("men");

  const [filterPersonnels, setFilterPersonnels] = useState({
    byCategorie: [],
    items: actifs,
    byPosition: [],
  });

  const [checked, setChecked] = useState({
    manChecked: false,
    womanChecked: false,
    fonctionnaireChecked: false,
    contractuelChecked: false,
    responsable: false,
  });

  const toggleCollapse = (e) => {
    setCollapse(!collapse);
    e.preventDefault();
  };

  useEffect(() => {
    if (props.positionList.length === 0) {
      props.fetchPositions(); // ajouter en memo
    }

    if (actifs.length === 0) {
      fetchPersonnel25000jeunes();
    } else {
      setFilterPersonnels({
        ...filterPersonnels,
        items: actifs,
      });
    }

    if (categories.length === 0) {
      fetchCategories(); // ajouter en memo
    }
  }, [
    fetchPersonnel25000jeunes,
    fetchCategories,
    props.fetchPositions,
    props.positionList,
  ]);

  const onChangeCategorie = (categorie) => {
    setCategorie(categorie);
    if (categorie === "Toutes les catégories") {
      fetchPersonnel25000jeunes();
    } else {
      let personnels = actifs.filter(
        (item) => item?.grade?.categorieIdCategorie === categorie
      );
      setFilterPersonnels({
        ...filterPersonnels,
        byCategorie: personnels,
        items: personnels,
      });
    }
  };

  // mauvais code
  const onChangePosition = (position) => {
    if (position === "Toutes les Positions") {
      fetchPersonnel25000jeunes();
    } else {
      let personnels = actifs.filter(
        (item) => item?.position?.idPosition == position
      );
      setFilterPersonnels({
        ...filterPersonnels,
        byPosition: personnels,
        items: personnels,
      });
    }
  };

  const onCheckedSexe = (event) => {
    switch (parseInt(event.target.value)) {
      case 1:
        setChecked({
          ...checked,
          manChecked: event.target.checked,
          womanChecked: false,
        });
        if (event.target.checked) {
          let men = actifs.filter((personnel) => personnel.sexe === "1");
          if (checked.fonctionnaireChecked) {
            men = actifs.filter(
              (personnel) =>
                personnel.sexe === "1" &&
                personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterPersonnels({
              ...filterPersonnels,
              items: men,
            });
          }

          if (checked.contractuelChecked) {
            men = actifs.filter(
              (personnel) =>
                personnel.sexe === "1" &&
                personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterPersonnels({
              ...filterPersonnels,
              items: men,
            });
          }
          setFilterPersonnels({
            ...filterPersonnels,
            items: men,
          });
        } else {
          let data = actifs;
          if (checked.fonctionnaireChecked) {
            data = actifs.filter(
              (personnel) => personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterPersonnels({
              ...filterPersonnels,
              items: data,
            });
          }

          if (checked.contractuelChecked) {
            data = actifs.filter(
              (personnel) => personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterPersonnels({
              ...filterPersonnels,
              items: data,
            });
          }
          setFilterPersonnels({
            ...filterPersonnels,
            items: data,
          });
        }
        break;

      case 2:
        setChecked({
          ...checked,
          manChecked: false,
          womanChecked: event.target.checked,
        });

        if (event.target.checked) {
          let women = actifs.filter((personnel) => personnel.sexe === "2");
          if (checked.fonctionnaireChecked) {
            women = actifs.filter(
              (personnel) =>
                personnel.sexe === "2" &&
                personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterPersonnels({
              ...filterPersonnels,
              items: women,
            });
          }

          if (checked.contractuelChecked) {
            women = actifs.filter(
              (personnel) =>
                personnel.sexe === "2" &&
                personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterPersonnels({
              ...filterPersonnels,
              items: women,
            });
          }
          setFilterPersonnels({
            ...filterPersonnels,
            items: women,
          });
        } else {
          let data = actifs;
          if (checked.fonctionnaireChecked) {
            data = actifs.filter(
              (personnel) => personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterPersonnels({
              ...filterPersonnels,
              items: data,
            });
          }

          if (checked.contractuelChecked) {
            data = actifs.filter(
              (personnel) => personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterPersonnels({
              ...filterPersonnels,
              items: data,
            });
          }
          setFilterPersonnels({
            ...filterPersonnels,
            items: data,
          });
        }

        break;
      case 3:
        setChecked({
          ...checked,
          contractuelChecked: false,
          fonctionnaireChecked: event.target.checked,
        });

        if (event.target.checked) {
          let fonctionnaires = actifs.filter(
            (personnel) => personnel.grade.statutAdministratifIdStatut === 1
          );
          if (checked.manChecked) {
            fonctionnaires = actifs.filter(
              (personnel) =>
                personnel.sexe === "1" &&
                personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterPersonnels({
              ...filterPersonnels,
              items: fonctionnaires,
            });
          }

          if (checked.womanChecked) {
            fonctionnaires = actifs.filter(
              (personnel) =>
                personnel.sexe === "2" &&
                personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterPersonnels({
              ...filterPersonnels,
              items: fonctionnaires,
            });
          }
          setFilterPersonnels({
            ...filterPersonnels,
            items: fonctionnaires,
          });
        } else {
          let data = actifs;
          if (checked.manChecked) {
            data = actifs.filter((personnel) => personnel.sexe === "1");
            setFilterPersonnels({
              ...filterPersonnels,
              items: data,
            });
          }

          if (checked.womanChecked) {
            data = actifs.filter((personnel) => personnel.sexe === "2");
            setFilterPersonnels({
              ...filterPersonnels,
              items: data,
            });
          }
          setFilterPersonnels({
            ...filterPersonnels,
            items: data,
          });
        }

        break;
      case 4:
        setChecked({
          ...checked,
          fonctionnaireChecked: false,
          contractuelChecked: event.target.checked,
        });

        if (event.target.checked) {
          let contractuels = actifs.filter(
            (personnel) => personnel.grade.statutAdministratifIdStatut !== 1
          );
          if (checked.manChecked) {
            contractuels = actifs.filter(
              (personnel) =>
                personnel.sexe === "1" &&
                personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterPersonnels({
              ...filterPersonnels,
              items: contractuels,
            });
          }

          if (checked.womanChecked) {
            contractuels = actifs.filter(
              (personnel) =>
                personnel.sexe === "2" &&
                personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterPersonnels({
              ...filterPersonnels,
              items: contractuels,
            });
          }
          setFilterPersonnels({
            ...filterPersonnels,
            items: contractuels,
          });
        } else {
          let data = actifs;
          if (checked.manChecked) {
            data = actifs.filter((personnel) => personnel.sexe === "1");
            setFilterPersonnels({
              ...filterPersonnels,
              items: data,
            });
          }

          if (checked.womanChecked) {
            data = actifs.filter((personnel) => personnel.sexe === "2");
            setFilterPersonnels({
              ...filterPersonnels,
              items: data,
            });
          }
          setFilterPersonnels({
            ...filterPersonnels,
            items: data,
          });
        }
        break;
      case 5:
        console.log("five");
        setChecked({
          ...checked,
          responsable: event.target.checked,
        });

        if (event.target.checked) {
          let responsable = actifs.filter(
            (personnel) => personnel.postes.length > 0
          );
          if (checked.manChecked) {
            responsable = actifs.filter(
              (personnel) =>
                personnel.sexe === "1" && personnel?.postes.length > 0
            );
            setFilterPersonnels({
              ...filterPersonnels,
              items: responsable,
            });
          }

          if (checked.womanChecked) {
            responsable = actifs.filter(
              (personnel) =>
                personnel.sexe === "2" &&
                personnel?.personnel?.postes.length > 0
            );
            setFilterPersonnels({
              ...filterPersonnels,
              items: responsable,
            });
          }
          setFilterPersonnels({
            ...filterPersonnels,
            items: responsable,
          });
        } else {
          let data = actifs;
          if (checked.manChecked) {
            data = actifs.filter((personnel) => personnel.sexe === "1");
            setFilterPersonnels({
              ...filterPersonnels,
              items: data,
            });
          }

          if (checked.womanChecked) {
            data = actifs.filter((personnel) => personnel.sexe === "2");
            setFilterPersonnels({
              ...filterPersonnels,
              items: data,
            });
          }
          setFilterPersonnels({
            ...filterPersonnels,
            items: data,
          });
        }

        break;

      default:
        setChecked({
          manChecked: false,
          womanChecked: false,
          fonctionnaireChecked: false,
          contractuelChecked: false,
          responsable: false,
        });
        break;
    }
  };

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              <div className="d-flex justify-content-between">
                <div>
                  <h4>
                    Personnel 25000 JEUNES: {filterPersonnels.items.length}
                  </h4>
                  <h5>Categorie: {getCategorie(categorie)} </h5>
                </div>

                <CFormGroup row>
                  <CCol md="4">
                    <span className="font-weight" htmlFor="selectSm">
                      Categorie
                    </span>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CSelect
                      onChange={(event) =>
                        onChangeCategorie(event.target.value)
                      }
                      defaultValue={categorie}
                      custom
                      size="md"
                      name="selectSm"
                      id="SelectLm"
                    >
                      {categories.length !== 0
                        ? [
                            {
                              idCategorie: "Toutes les catégories",
                              ageRetraite: 0,
                            },
                            ...categories,
                          ].map((categorie, index) => {
                            return (
                              <option key={index} value={categorie.idCategorie}>
                                {categorie.idCategorie}
                              </option>
                            );
                          })
                        : null}
                    </CSelect>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="4">
                    <span className="font-weight" htmlFor="selectSm">
                      Position
                    </span>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CSelect
                      onChange={(event) => onChangePosition(event.target.value)}
                      defaultValue={position}
                      custom
                      size="md"
                      name="selectSm"
                      id="SelectLm"
                    >
                      {props.positionList.length !== 0
                        ? [
                            {
                              idPosition: "Toutes les Positions",
                              libelle: "Toutes les Positions",
                            },
                            ...props.positionList,
                          ].map((position, index) => {
                            return (
                              <option key={index} value={position.idPosition}>
                                {position.libelle}
                              </option>
                            );
                          })
                        : null}
                    </CSelect>
                  </CCol>
                </CFormGroup>

                <Can
                  role={profile.roles[0]}
                  yes={() => (
                    <ExportButton
                      collapse={collapse}
                      toggleCollapse={toggleCollapse}
                    />
                  )}
                  no={() => ""}
                />
              </div>
              <div className="d-flex">
                <h5>Position: {getPosition(position)} </h5>
              </div>
              <div>
                <CCol>
                  <div className="p-3">
                    <CFormGroup variant="custom-checkbox" inline>
                      <CInputCheckbox
                        onChange={onCheckedSexe}
                        custom
                        id={`${name}nam`}
                        checked={checked.manChecked}
                        name={`${name}nam`}
                        value="1"
                      />
                      <CLabel variant="custom-checkbox" htmlFor={`${name}nam`}>
                        Homme
                      </CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-checkbox" inline>
                      <CInputCheckbox
                        checked={checked.womanChecked}
                        onChange={onCheckedSexe}
                        custom
                        id={`${name}woman`}
                        name={`${name}woman`}
                        value="2"
                      />
                      <CLabel
                        variant="custom-checkbox"
                        htmlFor={`${name}woman`}
                      >
                        Femme
                      </CLabel>
                    </CFormGroup>

                    <CFormGroup variant="custom-checkbox" inline>
                      <CInputCheckbox
                        checked={checked.fonctionnaireChecked}
                        onChange={onCheckedSexe}
                        custom
                        id={`${name}fonctionnaires`}
                        name={`${name}fonctionnaires`}
                        value="3"
                      />
                      <CLabel
                        variant="custom-checkbox"
                        htmlFor={`${name}fonctionnaires`}
                      >
                        Fonctionnaires
                      </CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-checkbox" inline>
                      <CInputCheckbox
                        checked={checked.contractuelChecked}
                        onChange={onCheckedSexe}
                        custom
                        id={`${name}contractuel`}
                        name={`${name}contractuel`}
                        value="4"
                      />
                      <CLabel
                        variant="custom-checkbox"
                        htmlFor={`${name}contractuel`}
                      >
                        Contractuels
                      </CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-checkbox" inline>
                      <CInputCheckbox
                        checked={checked.responsable}
                        onChange={onCheckedSexe}
                        custom
                        id={`${name}responsable`}
                        name={`${name}responsable`}
                        value="5"
                      />
                      <CLabel
                        variant="custom-checkbox"
                        htmlFor={`${name}responsable`}
                      >
                        Responsable
                      </CLabel>
                    </CFormGroup>
                  </div>
                  <hr />
                </CCol>
              </div>
              <div>
                <CollapseFied
                  collapse={collapse}
                  personnels={filterPersonnels.items}
                />
              </div>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={filterPersonnels.items}
                fields={fields25000}
                itemsPerPage={20}
                pagination
                hover
                loading={isLoading}
                sorter
                tableFilter
                columnFilter
                itemsPerPageSelect
                striped
                bordered
                scopedSlots={{
                  Numero: (item, index) => <td>{index}</td>,
                  corps: (item) => (
                    <td>
                      <CBadge
                        color={getBadge(item.grade.statutAdministratifIdStatut)}
                      >
                        {item.grade.statutAdministratif.libelleStatut}
                      </CBadge>
                    </td>
                  ),

                  grade: (item) => (
                    <td>
                      <CBadge color="success">{item.grade.libelleGrade}</CBadge>
                    </td>
                  ),

                  age: (item) => {
                    return (
                      <td>
                        <CBadge color="primary">
                          {item.dateNaissance === null
                            ? ""
                            : calculateAge(item.dateNaissance)}
                        </CBadge>
                      </td>
                    );
                  },
                  structure: (item, index) => {
                    return (
                      <td key={index}>
                        {item?.structure?.designationAdministrative}
                      </td>
                    );
                  },
                  poste: (item, index) => {
                    return <td key={index}>{item?.postes[0]?.libellePoste}</td>;
                  },
                  position: (item, index) => {
                    return (
                      <td key={index}>
                        {
                          <CBadge color={getBadge(item.position.idPosition)}>
                            {item.position.libelle}
                          </CBadge>
                        }
                      </td>
                    );
                  },

                  categorie: (item) => (
                    <td>{item?.grade.categorieIdCategorie}</td>
                  ),
                  Voir: (item, index) => {
                    return (
                      <td className="py-2">
                        <CTooltip content="Voir le profil du personnel">
                          <CButton
                            color="info"
                            to={`/personnels/${item.matricule}`}
                            size="sm"
                          >
                            <FontAwesomeIcon className="mr-2" icon={faEye} />
                            Voir
                          </CButton>
                        </CTooltip>
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

const mapStateToProps = ({
  personnelState,
  userState,
  categorieState,
  positionState,
}) => ({
  isLoading: personnelState.isLoading,
  actifs: personnelState.personnel25000Jeunes,
  profile: userState.profile,
  categories: categorieState.categories,
  positionList: positionState.positionList,
});

export default connect(mapStateToProps, {
  fetchPersonnel25000jeunes,
  fetchCategories,
  fetchPositions,
})(Personnel25000);
