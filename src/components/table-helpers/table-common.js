/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useTable, usePagination } from "react-table";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import { Dimmer } from "semantic-ui-react";
import EmptyState from "./empty-state";
import ErrorState from "./error-state";
import SpinLoader from "../spin-loader";
import PropTypes from "prop-types";

function TableCommon(props) {
  const {
    columns,
    data,
    fetchData,
    totalCount = "-1",
    pageSize = "50",
    tableClassName,
    isLoading,
    error,
    containerClassNames = "",
    disablePagination = false,
    tableWrapperClassNames = ""
  } = props;

  const history = useHistory();
  const location = useLocation();
  const qs = queryString.parse(location.search);
  const [tableState, updatetableState] = useState("loading");

  const {
    getTableProps, // for passing props to table
    getTableBodyProps, //for passing props to table body
    headerGroups,
    prepareRow,
    rows,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    gotoPage,
    state: { pageIndex },
    pageOptions
  } = useTable(
    {
      columns,
      data,
      manualPagination: true,
      initialState: { pageIndex: +qs.page > 1 ? +qs.page - 1 : 0 },
      pageCount: parseInt(totalCount) ? Math.ceil(parseInt(totalCount) / parseInt(pageSize)) : -1,
      disableSortBy: true,
      autoResetSortBy: false
    },
    usePagination
  );

  /* --------------------------- Methods ------------------------------- */

  const makeRequest = () => {
    const queryParams = {
      page: pageIndex + 1
    };
    fetchData({ ...queryParams, ...props.queryParams });
  };

  const cellClickHandler = (e, cell, row) => {
    if (cell.column.clickHandler) {
      cell.column.clickHandler(e, cell, row);
      e.stopPropagation();
    }
  };

  const rowClickHandler = (e, row) => {
    if (e && e.target && e.target.parentElement.className.includes("ignoreRowClick")) {
      return false;
    }
    if (props.rowClickHandler) {
      props.rowClickHandler(row);
      if (e && e.stopPropagation) {
        e.stopPropagation();
      }
    }
  };

  /* --------------------------- Effects ------------------------------- */

  useLayoutEffect(() => {
    if (!isLoading && data.length && !error) {
      updatetableState("loaded");
    } else if (!isLoading && error) {
      updatetableState("hasError");
    } else if (!isLoading && !data.length && !error) {
      updatetableState("empty");
    } else {
      updatetableState("loading");
    }
  }, [isLoading, data, error]);

  useEffect(() => {
    if (qs.page && totalCount) {
      const p = parseInt(qs.page, 10) - 1;
      if (p !== pageIndex) {
        gotoPage(p);
      }
    }
  }, [totalCount, qs.page]);

  useEffect(() => {
    makeRequest();
    const targetPage = pageIndex + 1;
    const stringified = queryString.stringify({ ...qs, page: targetPage });
    if (!qs.page) {
      // If page is not available in the url, instead of pushing to the history replacing it.
      history.replace({
        pathname: history.location.pathname,
        search: "?" + stringified
      });
    } else if (targetPage !== parseInt(qs.page, 10)) {
      history.push({
        pathname: history.location.pathname,
        search: "?" + stringified
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex]);

  /* --------------------------- Table View ------------------------------- */
  return (
    <Dimmer.Dimmable
      dimmed={tableState === "loading"}
      className={`padding-no border-no ${containerClassNames}`}>
      <div className={`table-wrapper ${tableWrapperClassNames}`}>
        <table
          {...getTableProps({
            className: `${tableClassName} border-none border-radius-five margin-no table-layout-fixed`
          })}>
          <thead>
            {headerGroups.map((headerGroup, index) => {
              return (
                <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => (
                    <th
                      key={index}
                      {...column.getHeaderProps({
                        className: `table-header ${column.headerClassName}`,
                        style: { width: column.width }
                      })}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps({})}>
            {tableState === "hasError" ? (
              <ErrorState refreshHandler={makeRequest} colSpan={columns.length} />
            ) : tableState === "empty" ? (
              <EmptyState colSpan={columns.length} />
            ) : (
              rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr
                    key={i}
                    {...row.getRowProps({
                      className: props.rowClickHandler && "cursor-pointer",
                      onClick: (e) => rowClickHandler(e, row)
                    })}>
                    {row.cells.map((cell, index) => (
                      <td
                        key={index}
                        {...cell.getCellProps([
                          {
                            onClick: (e) => cellClickHandler(e, cell, row),
                            className: cell.column.cellClassNames,
                            style: { width: cell.column.width }
                          }
                        ])}>
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {totalCount > 0 && !disablePagination && (
        <div
          className={`padding-sm-top padding-sm-bottom text-right text-color-white padding-sm-right`}>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="margin-right-five">
            {"<"}
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage} className="margin-right-five">
            {">"}
          </button>
          <span>
            Page {pageIndex + 1} of {pageOptions.length}
          </span>
        </div>
      )}
      <Dimmer active={tableState === "loading"}>
        <SpinLoader />
      </Dimmer>
    </Dimmer.Dimmable>
  );
}

export default TableCommon;

TableCommon.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
  totalCount: PropTypes.string,
  pageSize: PropTypes.string,
  tableClassName: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  event_id: PropTypes.string,
  error: PropTypes.any,
  containerClassNames: PropTypes.string
};
