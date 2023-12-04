import { CBadge, CButton, CImg, CInput, CTooltip } from "@coreui/react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  useAsyncDebounce,
  useFilters,
  useGlobalFilter,
  usePagination,
  useTable,
} from "react-table";
import { BUCKET_URL } from "../../../config";
import { getBadge } from "../../../utils/dataTables";
import { calculateAge } from "../../../utils/functions";

// Define a default UI for filtering
// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Recherche un personnel:{" "}
      <CInput
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder="Noms, Prenoms, Matricule etc..."
        style={{
          fontSize: "1.1rem",
        }}
      />
    </span>
  );
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

function Table({ columns, data, onHandleModal }) {
  // Use the state and functions returned from useTable to build your UI

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 10 },
      defaultColumn,
      filterTypes,
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  // Render the UI for your table
  return (
    <>
      <table className="table table-striped table-hover" {...getTableProps()}>
        <thead>
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: "left",
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>

          {headerGroups.map((headerGroup) => (
            <tr
              className="position-relative pr-4"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                onClick={(_) => onHandleModal(row?.original)}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/*
        Pagination can be built however you'd like.
        This is just a very basic UI implementation:
      */}

      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        Table
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

function PersonnelTable({ data, onHandleModal }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Numero",
        columns: [
          {
            Header: "N°",
            accessor: (_, index) => <span>{index}</span>,
          },
        ],
      },
      {
        Header: "Informations Personnels",
        columns: [
          {
            Header: "Photo",
            accessor: (item, index) => (
              <div
                className="c-avatar d-flex justify-content-center
            align-items-center
            "
              >
                <CImg
                  src={
                    item?.photo
                      ? `${BUCKET_URL}/personnels/${item.personnelIdArchive}/${item.photo}`
                      : `${BUCKET_URL}/default/user.png`
                  }
                  alt="photo de profil"
                  className="c-avatar-img"
                />
              </div>
            ),
          },
          {
            Header: "Matricule",
            accessor: "matricule",
            width: 50,
          },

          {
            Header: "Noms et Prenoms",
            accessor: "nomsPrenoms",
          },
        ],
      },
      {
        Header: "Informations",
        columns: [
          {
            Header: "Age",
            accessor: (item) => {
              return (
                <h5>
                  <CBadge color="primary">
                    {item.dateNaissance === null
                      ? ""
                      : calculateAge(item?.dateNaissance)}
                  </CBadge>
                </h5>
              );
            },
          },
          {
            Header: "Position",
            accessor: (item) => (
              <h5>
                <CBadge
                  className="text-white"
                  color={getBadge(item.position?.idPosition)}
                >
                  {item.position.libelle}
                </CBadge>
              </h5>
            ),
          },
          {
            Header: "Categorie",
            accessor: (item) => <span>{item.grade?.categorieIdCategorie}</span>,
          },
          {
            Header: "Corps",
            accessor: (item) => (
              <CBadge color={getBadge(item.grade?.statutAdministratifIdStatut)}>
                {item.grade?.statutAdministratif?.libelleStatut}
              </CBadge>
            ),
          },
          {
            Header: "Voir",
            accessor: (item, index) => {
              return (
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
              );
            },
          },
        ],
      },
    ],
    []
  );

  return (
    <div className="position-relative table-responsive">
      <Table onHandleModal={onHandleModal} columns={columns} data={data} />
    </div>
  );
}

export default PersonnelTable;
