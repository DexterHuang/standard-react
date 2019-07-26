import * as React from "react";
import { DARK_GREY } from "../../Theme/Variables";
import { View } from "../View/View";
import css from "./CloseIcon.module.css";
interface Props {
  onClick?: (e: React.MouseEvent) => any;
  color?: any;
  style?: React.CSSProperties;
  size?: number;
}
export const CloseIcon = ({ onClick, style, color = DARK_GREY, size = 16 }: Props) => {
  return (
    <View
      className={css.container}
      style={{
        width: size,
        height: size,
        position: "relative",
        cursor: "pointer",
        justifyContent: "center",
        ...style
      }}
      onClick={onClick}
    >
      <span
        className={css.line1}
        style={{
          backgroundColor: color,
          width: size
        }}
      />
      <span
        className={css.line2}
        style={{
          backgroundColor: color,
          width: size
        }}
      />
    </View>
  );
};
