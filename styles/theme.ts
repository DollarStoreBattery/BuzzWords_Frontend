import { ColourNames, FontSizes, PaddingSizes } from "./types";

export const colours: { [key in ColourNames]: string } = {
  "Soft White": "#fffaf2",
  "Antique White": "#fbefda",
  "Gold Crayola": "#f2c378",
  Gamboge: "#e49b30",
  Rust: "#a44202",
  Kobe: "#882701",
  "Dark Sienna": "#2b0e02",
};

export const spacings: { [key in PaddingSizes]: string } = {
  sm: "1rem",
  md: "1.5rem",
  lg: "2rem",
};

export const fontSizes: { [key in FontSizes]: string } = {
  xs: "1.2rem",
  sm: "1.6rem",
  md: "2.2rem",
  lg: "3rem",
  xl: "4rem",
};
