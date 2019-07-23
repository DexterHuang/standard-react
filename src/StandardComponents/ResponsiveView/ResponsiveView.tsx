import * as React from "react";
import styled from "styled-components";
import { getKeyValuePairs, jsonClone } from "../../Helper/GeneralHelper";
const Container: any = styled.div`
  ${(props: any) => ({
    display: "flex",
    flexDirection: "column",
    ...valueToPixel(props._style)
  })}
  @media (max-width: 758px) {
    ${(props: any) => ({ ...valueToPixel(props.phoneStyle) })}
  }
  @media (min-width: 758px) and (max-width: 992px) {
    ${(props: any) => ({ ...valueToPixel(props.tabletStyle) })}
  }
  @media (min-width: 992px) {
    ${(props: any) => ({ ...valueToPixel(props.webStyle) })}
  }
`;

const dontAddPixel: string[] = ["flex"];
const valueToPixel = (css: { [key: string]: any }) => {
  if (css) {
    css = jsonClone(css);
    const pairs = getKeyValuePairs(css);
    for (const { key, value } of pairs) {
      if (typeof value === "number" && dontAddPixel.indexOf(key) < 0) {
        css[key] = value + "px";
      }
    }
  }
  return css;
};
export interface ResponsiveStyles {
  className?: string;
  webStyle?: React.CSSProperties;
  tabletStyle?: React.CSSProperties;
  phoneStyle?: React.CSSProperties;
  style?: React.CSSProperties;
}
interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, ResponsiveStyles {
  classes?: any;
}
export const ResponsiveView = (props: Props) => {
  const { style, webStyle, phoneStyle, tabletStyle, children, className, onClick } = props;
  return (
    <Container
      _style={style}
      webStyle={webStyle}
      phoneStyle={phoneStyle}
      tabletStyle={tabletStyle}
      className={className}
      onClick={onClick}
    >
      {children}
    </Container>
  );
};
