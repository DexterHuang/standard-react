export const LIGHT_GREY = "#EEEEEE";
export const DARK_GREY = "grey";
const SHADOW_INNER_COLOR = "rgba(204,150,44,.1)";
const SHADOW_OUTER_COLOR = "rgba(0,0,0,.1)";

export const card = (height: number) => ({ ...shadow(height), borderRadius: 4, backgroundColor: "white", padding: 16 });
export const flatCard = () => ({ borderRadius: 6, backgroundColor: "white", padding: 16, border: `1px solid ${LIGHT_GREY}` });
export const shadow = (
  height: number,
  { outerColor = SHADOW_OUTER_COLOR, innerColor = SHADOW_INNER_COLOR, heightOffset = 1 } = {}
) => ({
  boxShadow: `0 ${height * 3}px ${heightOffset + height * 10}px ${outerColor}, 0 ${heightOffset + height * 1.5}px ${height *
    5}px ${innerColor}`
});

export const colorShadow = (height: number, color: any = `rgba(255,255,255,.9)`) => {
  return { boxShadow: `0 ${height * 6}px ${height * 20}px ${color}` };
};

export const textShadow = ({ radius = 64, color = "black", outline = false } = {}) => {
  return { textShadow: `0px 0px ${radius}px ${color}${outline ? `, 0px 0px 8px ${color}` : ``}` };
};
export const border = (radius: number) => ({
  boxShadow: "0 0 1px 0px black inset, 0 0 1px 0px black",
  border: "1px solid black",
  borderRadius: radius
});
