import {
  CBadge,
  CButton,
  CCol,
  CDataTable,
  CFormGroup,
  CImg,
  CInputCheckbox,
  CLabel,
  CRow,
  CTooltip,
} from "@coreui/react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { toast } from "react-toastify";
import CanLevelOne from "../../RBAC/CanLevelOne";
import CollapseFieldPoste from "../../common/CollapseFieldPoste";
import ExportButton from "../../common/ExportButton";
import PosteModal from "../../common/PosteModal";
import PostePDF from "../../common/PostePDF";
import { BUCKET_URL } from "../../config";
import { fieldsPoste, getBadge } from "../../utils/dataTables";
import { calculateAge } from "../../utils/functions";

const Poste = ({ postes, structure }) => {
  const [modal, setModal] = useState(false);
  const [posteDetail, setposteDetail] = useState("");
  const [filterPostes, setFilterPostes] = useState(postes);
  const [checked, setChecked] = useState({
    manChecked: false,
    womanChecked: false,
    retraite: false,
    vaccant: false,
  });

  const toggle = () => {
    setModal(!modal);
  };

  const role = localStorage.getItem("roles");

  const onHandleModal = (poste) => {
    console.log(poste, "handle poste");
    if (poste.personnel) {
      toggle();
      setposteDetail(poste);
    } else {
      toast.error("Poste vacant");
    }
  };
  const [collapse, setCollapse] = useState(false);

  const toggleCollapse = (e) => {
    setCollapse(!collapse);
    e.preventDefault();
  };

  const onChecked = (event) => {
    switch (parseInt(event.target.value)) {
      case 1:
        setChecked({
          ...checked,
          manChecked: event.target.checked,
          womanChecked: false,
          retraite: false,
          vaccant: false,
        });

        if (event.target.checked) {
          const men = postes.filter(({ personnel }) => personnel?.sexe === "1");
          setFilterPostes(men);
        } else {
          setFilterPostes(postes);
        }

        break;

      case 2:
        setChecked({
          ...checked,
          manChecked: false,
          retraite: false,
          vaccant: false,
          womanChecked: event.target.checked,
        });
        if (event.target.checked) {
          const women = postes.filter(
            ({ personnel }) => personnel?.sexe === "2"
          );
          setFilterPostes(women);
        } else {
          setFilterPostes(postes);
        }

        break;

      case 3:
        setChecked({
          ...checked,
          retraite: event.target.checked,
          vaccant: false,
          womanChecked: false,
          manChecked: false,
        });

        if (event.target.checked) {
          const retraites = postes.filter(
            ({ personnel }) => personnel?.position.idPosition === 2
          );
          setFilterPostes(retraites);
        } else {
          setFilterPostes(postes);
        }
        break;

      case 4:
        setChecked({
          ...checked,
          retraite: false,
          vaccant: event.target.checked,
          womanChecked: false,
          manChecked: false,
        });

        if (event.target.checked) {
          const vaccants = postes.filter(({ occupant }) => occupant === null);
          setFilterPostes(vaccants);
        } else {
          setFilterPostes(postes);
        }
        break;

      default:
        setChecked({
          manChecked: false,
          womanChecked: false,
          retraite: false,
          vaccant: false,
        });
        break;
    }
  };

  return (
    <>
      <PosteModal modal={modal} toggle={toggle} poste={posteDetail} />

      <CRow className=" d-flex justify-content-between">
        <div className="p-3">
          <CFormGroup variant="custom-checkbox" inline>
            <CInputCheckbox
              onChange={onChecked}
              custom
              id="postenam"
              checked={checked.manChecked}
              name="postenam"
              value="1"
            />
            <CLabel variant="custom-checkbox" htmlFor="postenam">
              Homme
            </CLabel>
          </CFormGroup>
          <CFormGroup variant="custom-checkbox" inline>
            <CInputCheckbox
              checked={checked.womanChecked}
              onChange={onChecked}
              custom
              id="postewoman"
              name="postewoman"
              value="2"
            />
            <CLabel variant="custom-checkbox" htmlFor="postewoman">
              Femme
            </CLabel>
          </CFormGroup>
          <CFormGroup variant="custom-checkbox" inline>
            <CInputCheckbox
              checked={checked.retraite}
              onChange={onChecked}
              custom
              id="retraite"
              name="retraite"
              value="3"
            />
            <CLabel variant="custom-checkbox" htmlFor="retraite">
              Retraité
            </CLabel>
          </CFormGroup>
          <CFormGroup variant="custom-checkbox" inline>
            <CInputCheckbox
              checked={checked.vaccant}
              onChange={onChecked}
              custom
              id="vaccant"
              name="vaccant"
              value="4"
            />
            <CLabel variant="custom-checkbox" htmlFor="vaccant">
              Vaccant
            </CLabel>
          </CFormGroup>
        </div>
        <hr />

        <CCol xs="12" md="12" className="d-flex justify-content-between">
          <h4>Total des postes: {filterPostes.length}</h4>
          <div className="d-flex justify-content-between">
            <CanLevelOne
              role={role}
              yes={() => (
                <ExportButton
                  collapse={collapse}
                  toggleCollapse={toggleCollapse}
                />
              )}
              no={() => ""}
            />
          </div>
        </CCol>

        <CCol>
          {/* <CanLevelOne
            role={role}
            yes={() => (
              <CollapseFieldPoste
                name="postes"
                collapse={collapse}
                postes={filterPostes}
              />
            )}
            no={() => ""}
          /> */}
        </CCol>
      </CRow>
      <CDataTable
        items={filterPostes}
        fields={fieldsPoste}
        itemsPerPage={10}
        itemsPerPageSelect
        pagination
        hover
        sorter
        header
        tableFilter
        columnFilter
        clickableRows
        striped
        onRowClick={(poste) => onHandleModal(poste)}
        bordered
        scopedSlots={{
          Numero: (item, index) => <td>{index}</td>,
          Structure: (item, index) => {
            const structure = item.structure;
            return structure ? (
              <td key={index}>{structure.designationAdministrative}</td>
            ) : (
              <td key={index}>Vide</td>
            );
          },
          picture: (item, index) => (
            <div
              className="c-avatar d-flex justify-content-center
            align-items-center
            "
            >
              <CImg
                src={
                  item.personnel?.photo
                    ? `${BUCKET_URL}/personnels/${item.personnel.personnelIdArchive}/${item.personnel.photo}`
                    : `${BUCKET_URL}/default/user.png`
                }
                alt="photo de profil"
                className="c-avatar-img"
              />
            </div>
          ),
          Occupant: (item, index) => {
            const personnel = item.personnel;
            return personnel ? (
              <td key={index}>{item.personnel.nomsPrenoms}</td>
            ) : (
              <td key={index}>
                <CBadge color="danger">Poste Vaccant</CBadge>
              </td>
            );
          },
          Categorie: (item, index) => {
            const personnel = item.personnel;
            return personnel ? (
              <td key={index}>{item.personnel.categorieIdCategorie}</td>
            ) : (
              <td key={index}></td>
            );
          },

          Matricule: (item, index) => {
            const personnel = item.personnel;
            return personnel ? (
              <td key={index}>{item.personnel.matricule}</td>
            ) : (
              <td key={index}></td>
            );
          },
          age: (item, index) => {
            const personnel = item.personnel;
            return personnel ? (
              <td key={index}>
                {
                  <CBadge color="primary">
                    {personnel.dateNaissance === null
                      ? ""
                      : calculateAge(personnel.dateNaissance)}
                  </CBadge>
                }
              </td>
            ) : (
              <td key={index}></td>
            );
          },

          NaturePoste: (item, index) => {
            const naturePoste = item.naturePoste;
            return naturePoste ? (
              <td key={index}>{item.naturePoste.libelleNaturePoste}</td>
            ) : (
              <td key={index}></td>
            );
          },

          RangPoste: (item, index) => {
            const naturePoste = item.naturePoste;
            return naturePoste ? (
              <td key={index}>{item.naturePoste.rangPoste.libelleRangPoste}</td>
            ) : (
              <td key={index}></td>
            );
          },

          Position: (item, index) => {
            const position = item.personnel;
            return position ? (
              <td>
                {
                  <CBadge color={getBadge(item.personnel.position.idPosition)}>
                    {item.personnel.position.libelle}
                  </CBadge>
                }
              </td>
            ) : (
              <td key={index}>
                <CBadge color="danger">Poste Vaccant</CBadge>
              </td>
            );
          },

          dateRetraite: (item, index) => {
            const position = item.personnel;
            return position ? (
              <td>{item.personnel.dateRetraite}</td>
            ) : (
              <td key={index}></td>
            );
          },

          Voir: (item, index) => {
            return (
              <td className="py-2">
                <CTooltip content="Voir les détails">
                  <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    to={`/postes/details/${item.idPoste}`}
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
    </>
  );
};

export default Poste;
