import React from "react";
import "./sortButton.css";
import cx from "classnames";

export const SortButton = ({
  isAccending = true,
  isActive = false,
  ...props
}) =>
  isAccending ? (
    <button
      className={cx("c-sort-button", { "c-sort-button--active": isActive })}
      {...props}
    >
      ↑
    </button>
  ) : (
    <button
      className={cx("c-sort-button", { "c-sort-button--active": isActive })}
      {...props}
    >
      ↓
    </button>
  );
