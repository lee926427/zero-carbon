import * as stylex from "@stylexjs/stylex";

export const breakpoints = stylex.defineConsts({
  mobile: "320px",
  tablet: "768px",
  desktop: "1200px",
});

export const media = stylex.defineConsts({
  mobile: `@media (min-width: ${breakpoints.mobile})`,
  tablet: `@media (min-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
});
