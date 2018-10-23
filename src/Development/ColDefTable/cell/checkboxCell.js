import React from "react";
import cx from "classnames";

export const CheckboxCell = ({
  isHeader,
  style,
  isBoxShadow,
  isChecked,
  onHandleCheckbox,
  className,
  checkboxKey,
  ...props
}) =>
  isHeader ? (
    <div
      className={cx("c-table--th c-checkbox-cell", {
        "c-table--box-shadow-th": isBoxShadow
      })}
      style={style}
      {...props}
    >
      <input
        id={`c-checkbox-label-${checkboxKey}`}
        type="checkbox"
        name="checkbox"
        onChange={e => onHandleCheckbox(e.target.checked)}
        className={`c-checkbox-cell--input`}
      />
      <label htmlFor={`c-checkbox-label-${checkboxKey}`} />
    </div>
  ) : (
    <div
      style={style}
      className={`c-table--td c-checkbox-cell ${className}`}
      {...props}
    >
      <input
        id={`c-checkbox-label-${checkboxKey}`}
        type="checkbox"
        onChange={e => onHandleCheckbox(e.target.checked)}
        checked={isChecked}
        className={`c-checkbox-cell--input`}
      />
      <label htmlFor={`c-checkbox-label-${checkboxKey}`} />
    </div>
  );
