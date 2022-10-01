import { colours, fontSizes, spacings } from "../../styles/theme";
import { ColourNames, FontSizes } from "../../styles/types";
import styled from "@emotion/styled";

type TextProps = {
  size?: FontSizes;
  textColour?: ColourNames;
  unPadded?: boolean;
};

const TextElement = styled("p")<TextProps>(
  {
    display: "flex",
    textAlign: "center",
  },
  (props) => ({
    padding: props.unPadded ? 0 : spacings.sm,
    margin: props.unPadded ? 0 : spacings.sm,
    fontSize: props.size ? fontSizes[props.size] : fontSizes.md,
    color: props.textColour
      ? colours[props.textColour]
      : colours["Dark Sienna"],
  })
);

export default TextElement;
