import * as React from "react";

interface Props {
  children?: any;
  className?: string;
  style?: React.CSSProperties;
}

export const Text: React.FC<Props> = ({ children, className, style }) => {
  return (
    <p className={className} style={{ ...style }}>
      {children}
    </p>
  );
};
