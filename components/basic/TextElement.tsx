import { colours, fontSizes, paddings } from "../../styles/theme";
import { ColourNames, FontSizes } from "../../styles/types";
import styled from "@emotion/styled";

type TextProps = {
  size?: FontSizes;
  textColour?: ColourNames;
};

const TextElement = styled("p")<TextProps>(
  {
    display: "flex",
    textAlign: "center",
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
