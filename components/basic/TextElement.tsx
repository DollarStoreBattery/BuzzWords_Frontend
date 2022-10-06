import { colours, fontFamilies, fontSizes, spacings } from "../../styles/theme";
import { ColourNames, FontFamilies, FontSizes } from "../../styles/types";
import styled from "@emotion/styled";

type TextProps = {
  size?: FontSizes;
  textColour?: ColourNames;
  unPadded?: boolean;
  fontFamily?: FontFamilies;
};

const TextElement = styled("p")<TextProps>(
  {
    fontFamily: fontFamilies.Simple,
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
    fontFamily: props.fontFamily ? fontFamilies[props.fontFamily] : "",
  })
);

export default TextElement;
