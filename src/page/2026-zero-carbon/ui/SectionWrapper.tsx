import { type PropsWithChildren } from "react";
import { color } from "@/shared/styles/tokens.stylex";
import { typography } from "@/shared/styles/typography.stylex";
import * as stylex from "@stylexjs/stylex";
import type { NavItem } from "./Navigation";
import { media } from "@/shared/styles/constants.stylex";

export const styles = stylex.create({
  section: {
    padding: "50px 0px 30px",
    scrollMarginTop: {
      default: 54,
      [media.desktop]: 76,
    },
  },
  heading: {
    color: color.accent,
    textAlign: "center",
    marginBottom: {
      default: "16px",
      [media.desktop]: "0 30px",
    },
  },
});

interface SectionWrapperProps {
  title: string;
  id: NavItem["id"];
}

export function SectionWrapper({ title, id, children }: PropsWithChildren<SectionWrapperProps>) {
  return (
    <section {...stylex.props(styles.section)} id={id}>
      <h2 {...stylex.props(typography.heading, styles.heading)}>{title}</h2>
      {children}
    </section>
  );
}
