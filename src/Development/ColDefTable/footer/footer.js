import React from "react";
import "./footer.css";

export const Footer = ({
  width,
  rowsPerPage,
  totalRows,
  onPrevPage,
  onNextPage
}) => (
  <footer
    className="c-footer"
    style={{
      width: width + "px"
    }}
  >
    <p className="c-footer--rows-per-page">Rows per page {rowsPerPage}</p>
    <p className="c-footer--count">
      1-{rowsPerPage} of {totalRows}
    </p>
    <div className="c-footer--pagination">
      <button onClick={onPrevPage} className="c-footer--pagination-button">
        ←
      </button>
      <button onClick={onNextPage} className="c-footer--pagination-button">
        →
      </button>
    </div>
  </footer>
);
