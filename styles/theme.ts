import { COLOURS, FONTSIZES, PADDINGSIZES } from "./types";

export const colours: { [key in COLOURS]: string } = {
  "Antique White": "#fbefda",
  "Gold Crayola": "#f2c378",
  Gamboge: "#e49b30",
  Rust: "#a44202",
  Kobe: "#882701",
  "Dark Sienna": "#2b0e02",
};

export const paddings: { [key in PADDINGSIZES]: string } = {
  sm: "1rem",
  md: "1.5rem",
  lg: "2rem",
};

export const fontSizes: { [key in FONTSIZES]: string } = {
  sm: "1.6em",
  md: "2.2rem",
  lg: "3rem",
  xl: "4rem",
};
