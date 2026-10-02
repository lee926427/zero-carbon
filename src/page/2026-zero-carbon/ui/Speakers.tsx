import { useLoaderData } from "@tanstack/react-router";

import { SectionWrapper } from "./SectionWrapper";
import * as stylex from "@stylexjs/stylex";
import { media } from "@/shared/styles/constants.stylex";
import { typography } from "@/shared/styles/typography.stylex";

const styles = stylex.create({
  container: {
    display: "grid",
    gridTemplateColumns: {
      default: "200px",
      [media.tablet]: "repeat(2, 200px)",
      [media.desktop]: "repeat(4, 200px)",
    },
    justifyContent: "center",
    margin: {
      default: "0 38px",
      [media.tablet]: "0 64px",
      [media.desktop]: "0 auto",
    },
    columnGap: "32px",
    rowGap: {
      default: "20px",
      [media.tablet]: "28px",
      [media.desktop]: "40px",
    },
    maxWidth: "1180px",
  },
  speaker: {
    flexBasis: "200px",
  },
  speakerImage: {
    width: "100%",
    aspectRatio: 1 / 1,
  },
  speakerName: {
    textAlign: "center",
  },
});

export function Speakers() {
  const data = useLoaderData({ from: "/2026-zero-carbon/" });

  if (!data || !data.metadata.speakers) {
    return null;
  }

  return (
    <SectionWrapper title="與會陣容" id="speakers">
      <div {...stylex.props(styles.container)}>
        {data.metadata.speakers.map((speaker, index) => (
          <div key={index} {...stylex.props(styles.speaker)}>
            <img {...stylex.props(styles.speakerImage)} src={speaker.image} loading="lazy" />
            <div {...stylex.props(styles.speakerName, typography.speaker)}>{speaker.name}</div>
            <div {...stylex.props(typography.speakerDescription)}>{speaker.description}</div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
