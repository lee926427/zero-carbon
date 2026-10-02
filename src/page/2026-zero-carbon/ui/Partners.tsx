import { SectionWrapper } from "./SectionWrapper";
import { useLoaderData } from "@tanstack/react-router";
import * as stylex from "@stylexjs/stylex";
import { media } from "@/shared/styles/constants.stylex";
import { fontSize, fontWeight } from "@/shared/styles/tokens.stylex";

const styles = stylex.create({
  container: {},
  image: {
    height: "30px",
  },
  organizerLayout: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "1rem",
    maxWidth: {
      default: "425px",
      [media.desktop]: "720px",
    },
    margin: "0 auto",
  },
  title: {
    fontWeight: fontWeight.medium,
    fontSize: fontSize.md,
    lineHeight: "180%",
    textAlign: "center",
    paddingTop: "24px",
    paddingBottom: "16px",
  },
});

export function Partners() {
  const data = useLoaderData({ from: "/2026-zero-carbon/" });

  if (!data || !data.metadata.partners) {
    return null;
  }

  const departments = Object.keys(data.metadata.partners);

  if (departments.length === 0) {
    return null;
  }

  return (
    <SectionWrapper title="共同推動" id="partners">
      <div {...stylex.props(styles.container)}>
        {departments.map((department) => (
          <div key={department}>
            <div {...stylex.props(styles.title)}>{department}</div>
            <div {...stylex.props(styles.organizerLayout)}>
              {data.metadata.partners[department].map((partner, index) => (
                <img
                  key={index}
                  {...stylex.props(styles.image)}
                  src={partner.image}
                  alt={partner.instruction}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
