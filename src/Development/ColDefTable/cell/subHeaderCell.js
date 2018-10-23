import React from "react";

export const SubHeaderCell = ({
  style,
  isFirstCell,
  subHeaderTitle,
  ...props
}) => {
  return isFirstCell ? (
    <div style={style} className="c-table--td c-table--sub-header-title">
      {subHeaderTitle}
    </div>
  ) : (
    <div style={style} className="c-table--td c-table--sub-header" />
  );
};
