import * as React from "react";

interface Props {
  children: any;
  style?: React.CSSProperties;
  className?: any;
}
export const View: React.FC<Props> = ({ children, style, className }) => {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};
