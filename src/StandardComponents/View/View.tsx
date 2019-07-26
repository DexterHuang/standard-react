import * as React from "react";
interface Props extends React.HTMLProps<HTMLDivElement> {
  children?: any;
  style?: React.CSSProperties;
  className?: any;
}
export const View: React.FC<Props> = props => {
  return <div {...props} />;
};
