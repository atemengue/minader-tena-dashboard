import {
  CBadge,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CImg,
  CInput,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CSpinner,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import {
  faEye,
  faFileAlt,
  faFileArchive,
  faFileContract,
  faHouseUser,
  faSearchMinus,
  faUserTag,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import {
  searchActe,
  searchDocument,
  searchPersonnel,
  searchPoste,
  searchStructure,
} from "../actions/searchActions";
import SearchActeResult from "../common/SearchActeResult";
// import SearchDocumentResult from "../common/SearchDocumentResult";
import SearchPosteResult from "../common/SearchPosteResult";
import SearchResultPersonnel from "../common/SearchResultPersonnel";
import SearchStructureResult from "../common/SearchStructureResult";

const delay = 3;

const Search = () => {
  const [term, setTerm] = useState("");
  const [show, setShow] = useState(false);
  const [results, setResults] = useState([]);
  const [searchPattern, setSearchPattern] = useState("personnels");

  const onChange = (term) => {
    let value = term.target.value;
    setTerm(value);
  };

  useEffect(
    () => {
      let timer1 = null;
      if (term) {
        setShow(true);
        timer1 = setTimeout(() => {
          onSearch(searchPattern);
        }, delay * 500);
      }

      // this will clear Timeout
      // when component unmount like in willComponentUnmount
      // and show will not change to true
      return () => {
        clearTimeout(timer1);
      };
    },
    // useEffect will run only one time with empty []
    // if you pass a value to array,
    // like this - [data]
    // than clearTimeout will run every time
    // this value changes (useEffect re-run)
    [term]
  );

  const onSearch = (pattern) => {
    setSearchPattern(pattern);
    if (term) {
      setShow(true);
      switch (pattern) {
        case "personnels":
          onSearchMutation.mutate(term);
          break;
        case "documents":
          onSearchMutationDocument.mutate(term);
          break;
        case "structures":
          onSearchMutationStructure.mutate(term);
          break;
        case "postes":
          onSearchMutationPoste.mutate(term);
          break;
        case "actes":
          onSearchMutationActe.mutate(term);
          break;
        default:
          onSearchMutation.mutate(term);
          break;
      }
    }
  };

  const onSearchMutation = useMutation((term) => searchPersonnel(term), {
    onSuccess: (response) => {
      setShow(false);
      setResults(response.data);
    },
    onError: (error) => {
      setShow(false);
      console.log(error);
    },
  });

  const onSearchMutationDocument = useMutation((term) => searchDocument(term), {
    onSuccess: (response) => {
      setShow(false);
      setResults(response.data);
    },
    onError: (error) => {
      setShow(false);
      console.log(error);
    },
  });

  const onSearchMutationActe = useMutation((term) => searchActe(term), {
    onSuccess: (response) => {
      setShow(false);
      setResults(response.data);
    },
    onError: (error) => {
      setShow(false);
      console.log(error);
    },
  });

  const onSearchMutationStructure = useMutation(
    (term) => searchStructure(term),
    {
      onSuccess: (response) => {
        setShow(false);
        setResults(response.data);
      },
      onError: (error) => {
        setShow(false);
        console.log(error);
      },
    }
  );

  const onSearchMutationPoste = useMutation((term) => searchPoste(term), {
    onSuccess: (response) => {
      setShow(false);
      setResults(response.data);
    },
    onError: (error) => {
      setShow(false);
      console.log(error);
    },
  });

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <div className="brand-wrapper">
              <img
                src="images/icons/minader.jpeg"
                alt="logo"
                className="logo"
              />
              {onSearchMutation.isLoading ||
                (show && <CSpinner size="sm" color="success" />)}
            </div>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xl="8">
                <CInput
                  onChange={onChange}
                  size="lg"
                  value={term}
                  type="search"
                  id="search"
                  placeholder="Recherchez un personnel, un document, un poste, un acte ..."
                  shape={true}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CTabs activeTab="personnels">
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink
                        value="personnels"
                        onClick={() => onSearch("personnels")}
                        data-tab="personnels"
                      >
                        <FontAwesomeIcon
                          size="1x"
                          className="mr-1"
                          icon={faUserTag}
                        />
                        Personnels
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink
                        onClick={() => onSearch("postes")}
                        data-tab="postes"
                      >
                        <FontAwesomeIcon
                          size="1x"
                          className="mr-1"
                          icon={faUserTie}
                        />
                        Postes
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink
                        onClick={() => onSearch("structures")}
                        data-tab="structures"
                      >
                        <FontAwesomeIcon
                          size="1x"
                          className="mr-1"
                          icon={faHouseUser}
                        />
                        Structures
                      </CNavLink>
                    </CNavItem>
                    {/* <CNavItem>
                      <CNavLink
                        onClick={() => onSearch("documents")}
                        data-tab="documents"
                      >
                        <FontAwesomeIcon
                          size="1x"
                          className="mr-1"
                          icon={faFileArchive}
                        />
                        Documents Personnels
                      </CNavLink>
                    </CNavItem> */}
                    <CNavItem>
                      <CNavLink
                        onClick={() => onSearch("actes")}
                        data-tab="actes"
                      >
                        <FontAwesomeIcon
                          size="1x"
                          className="mr-1"
                          icon={faFileAlt}
                        />
                        Actes
                      </CNavLink>
                    </CNavItem>
                  </CNav>
                  <p className="numberOfResults">A propos {results.length}</p>

                  <CTabContent>
                    <CTabPane data-tab="personnels">
                      {results?.length === 0 ? (
                        <div className="text-center">
                          <FontAwesomeIcon icon={faSearchMinus} size="5x" />
                          <h3>AUCUN PERSONNEL TROUVÉ</h3>
                        </div>
                      ) : (
                        <div className="searchResults">
                          <SearchResultPersonnel personnels={results} />;
                        </div>
                      )}
                    </CTabPane>

                    {/* <CTabPane data-tab="documents">
                      {results?.length === 0 ? (
                        <div className="text-center">
                          <FontAwesomeIcon icon={faFileContract} size="5x" />
                          <h3>AUCUN DOCUMENTS TROUVÉ</h3>
                        </div>
                      ) : (
                        <div className="searchResults">
                          {results.map((docs) => {
                            return <SearchDocumentResult document={docs} />;
                          })}
                        </div>
                      )}
                    </CTabPane> */}

                    <CTabPane data-tab="postes">
                      <SearchPosteResult postes={results} />
                    </CTabPane>

                    <CTabPane data-tab="structures">
                      <SearchStructureResult structures={results} />
                    </CTabPane>

                    <CTabPane data-tab="actes">
                      <SearchActeResult actes={results} />
                    </CTabPane>
                  </CTabContent>
                </CTabs>
              </CCol>
            </CRow>

            <CRow>
              <CCol>
                {/* <div className="searchResults">
                  <p className="numberOfResults">
                    A propos {results.length} resultats (0.48 seconds)
                  </p>
                  {results.map(data => {
                    return (
                      <SearchDocumentPersonnel document={data} />
                    )
                  })}
                </div> */}
              </CCol>
            </CRow>
          </CCardBody>

          <CCardFooter></CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Search;
