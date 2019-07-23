import * as React from "react";

interface Props {
  children?: any;
  className?: string;
  style?: React.CSSProperties;
  header1?: boolean;
  header2?: boolean;
  header3?: boolean;
}

export const Text: React.FC<Props> = ({
  children,
  className,
  style,
  header1,
  header2,
  header3
}) => {
  let elementName = "p";
  if (header1) {
    elementName = "h1";
  } else if (header2) {
    elementName = "h2";
  } else if (header3) {
    elementName = "h3";
  }
  const Component = p => React.createElement(elementName, p);

  return (
    <Component className={className} style={{ ...style }}>
      {children}
    </Component>
  );
};
