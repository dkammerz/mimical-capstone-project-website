/*
 * Pagination table component
 */
import React, { useMemo } from "react";
import { useTable, usePagination, useGlobalFilter, useFilters } from "react-table";
import { COLUMNS } from "./columns";
import MOCK_DATA from "./MOCK_DATA2.json"; // The entries in the MYSQL database will be displayed in the table when the database is connected .. right now it is only a dummy
import GlobalFilter from './GlobalFilter';

// This is a (right now not) reusable component for a pagination table

function PaginationTable(props, json) {
  const columns = useMemo(() => COLUMNS, []); //Columns are defined in the columns.js file
  const data = useMemo(() => MOCK_DATA, []);  //Data is defined in the MOCK_DATA2.json file
  const defaultColumn = useMemo(() => {
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex, pageSize },
    gotoPage,
    pageCount,
    setPageSize,
    state: { globalFilter },
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  return (
    <div className="table-container mt-10">
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> {/* See Global Filter for more information */}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
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
      <div>
        <span>
          Seite{" "}
          <strong>
            {pageIndex + 1} von {pageOptions.length}
          </strong>
        </span>
        <select
          className="bg-gray-500 mx-4 mr-2"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Anzahl Einträge: {pageSize}
            </option>
          ))}
        </select>

        <button
          className="text-white mx-1"
          disabled={!canPreviousPage}
          onClick={() => gotoPage(0)}
        >
          {"<<"}
        </button>
        <button
          className="text-white mx-1"
          disabled={!canPreviousPage}
          onClick={() => previousPage()}
        >
          Zurück
        </button>
        <button
          className="text-white mx-1"
          disabled={!canNextPage}
          onClick={() => nextPage()}
        >
          Weiter
        </button>
        <button
          className="text-white mx-1"
          disabled={!canNextPage}
          onClick={() => gotoPage(pageCount - 1)}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default PaginationTable;
