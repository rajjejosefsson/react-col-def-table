import React from "react";

export const Cell = ({ className, style, children, ...props }) => {
  return (
    <div className={`c-table--td ${className}`} style={style} {...props}>
      {children}
    </div>
  );
};
