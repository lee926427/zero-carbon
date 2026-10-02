import { SectionWrapper } from "./SectionWrapper";
import { useLoaderData } from "@tanstack/react-router";
import * as stylex from "@stylexjs/stylex";
import { media } from "@/shared/styles/constants.stylex";
import { color } from "@/shared/styles/tokens.stylex";
import { typography } from "@/shared/styles/typography.stylex";

const styles = stylex.create({
  container: {
    display: "flex",
    flexDirection: {
      default: "column",
      [media.desktop]: "row",
    },
    alignItems: "center",
    maxWidth: "960px",
    margin: "0 auto",
    gap: {
      default: "40px",
      [media.desktop]: "20px",
    },
  },
  image: {
    width: "184px",
    aspectRatio: 1 / 1,
    order: {
      default: 1,
      [media.desktop]: 2,
    },
    backgroundColor: color.secondary,
  },
  paragraph: {
    margin: "0 1rem",
    order: {
      default: 2,
      [media.desktop]: 1,
    },
  },
});

export function Description() {
  const data = useLoaderData({ from: "/2026-zero-carbon/" });

  if (!data) {
    return null;
  }

  return (
    <SectionWrapper title="論壇簡介" id="introduction">
      <div {...stylex.props(styles.container)}>
        <img
          {...stylex.props(styles.image)}
          src={data.metadata.pageInfo.introduction.instruction}
          alt="論壇簡介"
        />
        <p {...stylex.props(styles.paragraph, typography.paragraph)}>
          {data.metadata.pageInfo.introduction.content}
        </p>
      </div>
    </SectionWrapper>
  );
}
