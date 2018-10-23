import React from "react";
import { SortButton } from "../sortButton";
import cx from "classnames";

export const HeaderCell = ({
  isSortOn,
  headerLabel,
  isActiveSortCell,
  onSort,
  isAccendingSort,
  style,
  isBoxShadow,
  onLabelClick,
  ...props
}) => (
  <div
    style={style}
    className={cx("c-table--th", {
      "c-table--box-shadow-th": isBoxShadow
    })}
  >
    <p
      onClick={onLabelClick ? onLabelClick : null}
      className={cx({
        "c-table--th-sort": isSortOn,
        "c-table--th-sort-active": isActiveSortCell,
        "c-table--th-label-clickable": onLabelClick
      })}
    >
      {headerLabel}
    </p>
    {isSortOn && (
      <SortButton
        onClick={onSort}
        isActive={isActiveSortCell}
        isAccending={isAccendingSort && isActiveSortCell}
      />
    )}
  </div>
);
