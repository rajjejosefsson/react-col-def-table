import React, { Component, Fragment } from "react";
import { MultiGrid } from "react-virtualized";
import AutoSizer from "react-virtualized/dist/es/AutoSizer";
import "react-virtualized/styles.css";

import {
  Cell,
  EditableCell,
  CheckboxCell,
  HeaderCell,
  SubHeaderCell
} from "../cell";
import { sorter } from "../utils/sorter";
import PropTypes from "prop-types";
import "./table.css";

/**
 * @file Table is a React Component wrapper around {@link https://github.com/bvaughn/react-virtualized} React Virtualized MultiGrid.}
 *
 * @module Table
 * @extends Component
 */
export class Table extends Component {
  static defaultProps = {
    isBoxShadow: true,
    rowHeight: 40,
    headerHeight: 50
  };

  state = {
    hoveredColumnIndex: null,
    hoveredRowIndex: null,
    list: this.props.list,
    isAccending: false,
    activeColumn: null,
    checkboxStates: {}
  };

  _grid = null;

  // Responsible for rendering a single cell, given its row and column index.
  cellRenderer = ({ style, columnIndex, rowIndex, key }) => {
    const {
      colDef,
      isSortOn,
      isZebra,
      hoverOnX,
      hoverOnY,
      isBoxShadow,
      onLabelClick
    } = this.props;

    const { list } = this.state;
    const rowObj = list[rowIndex - 1];
    const columnKey = colDef[columnIndex].key;

    //  HEADER CELL
    if (rowIndex === 0 && columnKey !== "checkbox") {
      const columnLabel = colDef[columnIndex].label;
      const isActiveSortCell = this.state.activeColumn === columnKey;
      return (
        <HeaderCell
          key={key}
          style={style}
          isBoxShadow={isBoxShadow}
          headerLabel={columnLabel}
          isSortOn={isSortOn}
          onSort={() => this.sortColumn(columnKey)}
          onLabelClick={
            onLabelClick ? () => onLabelClick(colDef[columnIndex]) : false
          }
          isActiveSortCell={isActiveSortCell}
          isAccendingSort={this.state.isAccending && isActiveSortCell}
        />
      );
    }

    // SUBHEADER CELL
    if (rowObj && rowObj.subheader) {
      return (
        <SubHeaderCell
          key={key}
          style={style}
          isFirstCell={columnIndex === 0}
          subHeaderTitle={rowObj.subheader}
        />
      );
    }

    // Only get the classes when desired effect is activated
    const rowClass = isZebra ? this.getRowClass(rowIndex) : "";
    const hoverCellClass =
      hoverOnY || hoverOnX ? this.getHoverCellClass(rowIndex, columnIndex) : "";

    // CHECKBOX CELL
    if (columnKey === "checkbox") {
      const isHeader = rowIndex === 0;
      return (
        <CheckboxCell
          key={key}
          checkboxKey={key}
          style={style}
          className={`${rowClass} ${hoverCellClass}`}
          isHeader={isHeader}
          isBoxShadow={isBoxShadow}
          onHandleCheckbox={isChecked =>
            this.onHandleCheckbox(isChecked, isHeader ? "ALL" : rowObj)
          }
          isChecked={
            rowObj &&
            !!this.state.checkboxStates[rowObj.id] &&
            this.state.checkboxStates[rowObj.id].isChecked
          }
          onMouseOver={() =>
            this.onMouseOverCell(hoverOnY, hoverOnX, columnIndex, rowIndex)
          }
        />
      );
    }

    // CUSTOM COMPONENT CELL
    if (colDef[columnIndex].component) {
      const Component = colDef[columnIndex].component;
      return (
        <Cell
          key={key}
          style={style}
          className={`${rowClass} ${hoverCellClass}`}
          onMouseOver={() =>
            this.onMouseOverCell(hoverOnY, hoverOnX, columnIndex, rowIndex)
          }
        >
          <Component rowData={rowObj} />
        </Cell>
      );
    }

    // EDITABLE CELL
    if (this.props.isEditable) {
      return (
        <EditableCell
          key={key}
          style={style}
          className={`${rowClass} ${hoverCellClass}`}
          inputClass={isZebra ? "c-table--input-zebra" : ""}
          onCellBlur={newValue => this.onEditCell(newValue, rowObj, columnKey)}
          onMouseOver={() =>
            this.onMouseOverCell(hoverOnY, hoverOnX, columnIndex, rowIndex)
          }
        >
          {rowObj[columnKey]}
        </EditableCell>
      );
    }

    // REGULAR CELL
    return (
      <Cell
        key={key}
        style={style}
        className={`${rowClass} ${hoverCellClass}`}
        onMouseOver={() =>
          this.onMouseOverCell(hoverOnY, hoverOnX, columnIndex, rowIndex)
        }
      >
        {rowObj[columnKey]}
      </Cell>
    );
  };

  /**
   *
   * @param {boolean} isChecked
   * @param {object|string} checkedRow
   */
  onHandleCheckbox = (isChecked, checkedRow) => {
    console.log(checkedRow);
    // SET ALL CHECKED OR UNCHECKED
    if (checkedRow === "ALL") {
      const allRows = this.state.list.reduce(
        (acc, row, currentIndex, array) => {
          acc[row.id] = { id: row.id, isChecked: isChecked };
          return acc;
        },
        {}
      );
      this.setState({ checkboxStates: allRows });
    }

    // CHECK THE SELECTED CELL
    this.setState(({ checkboxStates }) => ({
      checkboxStates: {
        ...checkboxStates,
        [checkedRow.id]: { id: checkedRow.id, isChecked: isChecked }
      }
    }));
  };

  /**
   * Sets hover effect vertical or horizontal if activated
   *
   * @param {boolean} hoverOnY - enables vertical hover effect
   * @param {boolean} hoverOnX - enables horizontal hover effect
   * @param {number} columnIndex - determinds what column is active
   * @param {number} rowIndex - determinds what row is active
   */
  onMouseOverCell = (hoverOnY, hoverOnX, columnIndex, rowIndex) => {
    if (hoverOnY || hoverOnX) {
      this.setState({
        hoveredColumnIndex: hoverOnY ? columnIndex : null,
        hoveredRowIndex: hoverOnX ? rowIndex : null
      });
    }
  };

  /**
   *
   * @param {number} rowIndex - Get the hover class for the row when match
   * @param {number} columnIndex Get the hover class for the column when match
   */
  getHoverCellClass = (rowIndex, columnIndex) => {
    const hoverClass =
      columnIndex === this.state.hoveredColumnIndex ||
      rowIndex === this.state.hoveredRowIndex
        ? "c-table--td-hover-cell"
        : "";
    return hoverClass;
  };

  /**
   *
   * @param {string} newValue
   * @param {object} rowObj
   * @param {string} key
   */
  onEditCell = (newValue, rowObj, key) => {
    this.props.onCellChange({ rowObj, key, newValue });
  };

  /**
   * Used to get zebra stripes class
   *
   * @param {number} index
   */
  getRowClass = index => {
    return index % 2 === 0 ? "c-table--row-even" : "c-table--row-odd";
  };

  /**
   *  When the responsive window width is greater
   * then the specefied total in colDef
   * we will show the width of the total colDef
   *
   *  eg: window width = 800px
   *     colDef width = 400px
   *     (We show colDef width)
   *
   * @param {array} colDef
   * @param {number} windowWidth
   * @return {number}
   */
  calculateGridWidth = (colDef, windowWidth) => {
    const totalColDefWidth = colDef.reduce(
      (acc, val) => (acc = acc + val.size),
      0
    );
    return totalColDefWidth < windowWidth ? totalColDefWidth : windowWidth;
  };

  /**
   *
   * @param {array} list
   * @param {number} rowHeight
   * @return {number}
   */
  calculateGridHeight = (list, rowHeight) => {
    const numberOfRows = list.length;
    return rowHeight * numberOfRows;
  };

  /**
   *
   * @param {string} column
   */
  sortColumn(column) {
    const isFirstTime = this.state.activeColumn !== column;
    const { list, isAccending } = this.state;
    // First time sorting should be accending ↑
    if (isFirstTime) {
      let updatedList = sorter(list, column, true);

      this.setState(
        ({ isAccending }) => ({
          list: updatedList,
          isAccending: true,
          activeColumn: column
        }),
        () => this._grid.forceUpdateGrids()
      );
    } else {
      // Sort based on the oposite state of the current direction
      let updatedList = sorter(list, column, !isAccending);
      this.setState(
        ({ isAccending }) => ({
          list: updatedList,
          isAccending: !isAccending,
          activeColumn: column
        }),
        () => this._grid.forceUpdateGrids()
      );
    }
  }

  render() {
    const {
      colDef,
      fixedRowCount,
      fixedColumnCount,
      fixedHeight,
      fixedWidth,
      style,
      rowHeight,
      headerHeight,
      isBoxShadow,
      footer
    } = this.props;

    const { list } = this.state;

    return (
      <AutoSizer disableHeight={true}>
        {({ width }) => (
          <Fragment>
            <MultiGrid
              ref={ref => (this._grid = ref)}
              style={{
                boxShadow: isBoxShadow
                  ? "0 1px 4px 0 rgba(41, 51, 57, 0.5)"
                  : "",
                ...style
              }}
              cellRenderer={this.cellRenderer}
              columnWidth={({ index }) => colDef[index].size}
              columnCount={colDef.length}
              fixedRowCount={fixedRowCount}
              fixedColumnCount={fixedColumnCount}
              rowHeight={row => (row.index === 0 ? headerHeight : rowHeight)}
              height={fixedHeight || this.calculateGridHeight(list, rowHeight)}
              width={fixedWidth || this.calculateGridWidth(colDef, width)}
              rowCount={list.length + 1}
              classNameTopLeftGrid="c-table--top-left-grid"
              classNameTopRightGrid="c-table--top-right-grid"
              classNameBottomLeftGrid="c-table--bottom-left-grid"
              classNameBottomRightGrid="c-table--bottom-right-grid"
            />
            {footer &&
              React.cloneElement(footer, {
                width: fixedWidth || this.calculateGridWidth(colDef, width)
              })}
          </Fragment>
        )}
      </AutoSizer>
    );
  }
}

Table.propTypes = {
  list: PropTypes.array.isRequired,

  colDef: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      label: PropTypes.string,
      component: PropTypes.func
    })
  ).isRequired,

  style: PropTypes.object,

  fixedRowCount: PropTypes.number,
  fixedColumnCount: PropTypes.number,
  fixedHeight: PropTypes.number,
  fixedWidth: PropTypes.number,
  rowHeight: PropTypes.number,
  headerHeight: PropTypes.number,

  footer: PropTypes.element,

  isBoxShadow: PropTypes.bool,
  isSortOn: PropTypes.bool,
  isZebra: PropTypes.bool,
  hoverOnX: PropTypes.bool,
  hoverOnY: PropTypes.bool,
  isEditable: PropTypes.bool,

  onLabelClick: PropTypes.func,
  onCellChange: PropTypes.func
};
