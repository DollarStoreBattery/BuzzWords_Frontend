import { colours, fontSizes, paddings } from "../styles/theme";
import { COLOURS, FONTSIZES } from "../styles/types";
import styled from "@emotion/styled";

type TextProps = {
  size?: FONTSIZES;
  textColour?: COLOURS;
};

const TextElement = styled("p")<TextProps>(
  {
    display: "flex",
    paddingLeft: paddings.sm,
    paddingRight: paddings.sm,
  },
  (props) => ({
    fontSize: props.size ? fontSizes[props.size] : fontSizes.md,
    color: props.textColour
      ? colours[props.textColour]
      : colours["Dark Sienna"],
  })
);

export default TextElement;
