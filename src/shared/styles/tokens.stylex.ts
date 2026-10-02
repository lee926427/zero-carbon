import * as stylex from "@stylexjs/stylex";

/**
 * Typography tokens extracted from the Figma design
 * (https://www.figma.com/design/kpEuuiV2xRvs1L8sHS75TP, node 2143:1651).
 * Observed styles: h1 headings (32px/1.8, bold), body text — time/topic
 * labels (16px/24px, 1.4px tracking, regular or bold), buttons (16px bold),
 * and footer/fine print (10px/1.5).
 */
export const color = stylex.defineVars({
  primary: "#E2F4EB",
  secondary: "#5A5A61",
  accent: "#11AD74",
});

export const fontFamily = stylex.defineVars({
  NotoSansTC: "'Noto Sans TC', system-ui, sans-serif",
});

export const fontWeight = stylex.defineVars({
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
});

export const fontSize = stylex.defineVars({
  xs: "0.625rem",
  sm: "0.875rem",
  base: "1rem",
  md: "1.25rem",
  lg: "1.5rem",
  xl: "2rem",
  xxl: "2.5rem",
});

export const lineHeight = stylex.defineVars({
  base: 1,
  sm: 1.2,
  md: 1.5,
  lg: 1.8,
  xl: 2.5,
});

export const tracking = stylex.defineVars({
  body: "1.4px",
});

/**
 * Replicates Tailwind v4's `space-y-*` / `space-x-*`
 * (`& > :not(:last-child) { margin-block-end / margin-inline-end: <value> }`).
 * StyleX can't target siblings from a parent class, so apply these to each
 * CHILD directly instead of the container; `:not(:last-child)` on the child
 * achieves the same result. Scale matches Tailwind's (1 unit = 0.25rem),
 * e.g. `space.y(2.5)` === Tailwind's `space-y-2.5`.
 */
export const space = stylex.create({
  // v4: `& > :not(:last-child) { margin-block-end: <value> }` (non-reversed).
  y: (multiplier: number) => ({
    marginBlockStart: 0,
    marginBlockEnd: {
      default: 0,
      ":not(:last-child)": `${multiplier * 0.25}rem`,
    },
  }),
  // v4: `& > :not(:last-child) { margin-inline-end: <value> }` (non-reversed).
  x: (multiplier: number) => ({
    marginInlineStart: 0,
    marginInlineEnd: {
      default: 0,
      ":not(:last-child)": `${multiplier * 0.25}rem`,
    },
  }),
});

export const styleVars = stylex.defineVars({
  bleed: "3rem",
});
