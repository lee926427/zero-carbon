import * as stylex from "@stylexjs/stylex";
import { SectionWrapper } from "./SectionWrapper";
import { useLoaderData } from "@tanstack/react-router";
import { color, fontWeight, space } from "@/shared/styles/tokens.stylex";
import { media } from "@/shared/styles/constants.stylex";

const styles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  evenContainer: {
    backgroundColor: "#C2F0E3",
    borderStyle: "solid",
    borderColor: color.secondary,
    borderTopRightRadius: "20px",
    borderBottomRightRadius: "20px",
    borderWidth: "2px",
    borderLeftWidth: "0px",
    marginRight: {
      default: "10vw",
      [media.desktop]: "10vw",
    },
  },
  oddContainer: {
    backgroundColor: "#D3F2E3",
    borderStyle: "solid",
    borderColor: color.secondary,
    borderTopLeftRadius: "20px",
    borderBottomLeftRadius: "20px",
    borderWidth: "2px",
    borderRightWidth: "0px",
    marginLeft: {
      default: "10vw",
      [media.desktop]: "10vw",
    },
  },
  item: {
    display: {
      default: "block",
      [media.desktop]: "grid",
    },
    width: {
      default: "75vw",
      [media.desktop]: "77.25vw",
    },
    maxWidth: {
      default: "720px",
      [media.desktop]: "100vw",
    },
    gap: {
      default: "0",
      [media.desktop]: "80px",
    },
    gridTemplateColumns: {
      default: "auto",
      [media.desktop]: "100px 300px auto",
    },
    padding: "12px 0px",
    color: color.secondary,
  },
  even: {
    marginLeft: "auto",
    paddingRight: {
      default: "20px",
      [media.tablet]: "40px",
    },
  },
  odd: {
    marginRight: "auto",
    paddingLeft: {
      default: "20px",
      [media.tablet]: "40px",
    },
  },
  scheduleTime: {
    color: color.accent,
    fontWeight: fontWeight.bold,
  },
});

export function Schedule() {
  const data = useLoaderData({ from: "/2026-zero-carbon/" });

  if (!data || !data.metadata.schedule || !Array.isArray(data.metadata.schedule)) {
    return null;
  }

  return (
    <SectionWrapper title="論壇議程" id="schedule">
      <div {...stylex.props(styles.container)}>
        {data.metadata.schedule.map((item, index) => (
          <div
            key={index}
            {...stylex.props(index % 2 === 0 ? styles.evenContainer : styles.oddContainer)}
          >
            <div {...stylex.props(styles.item, index % 2 === 0 ? styles.even : styles.odd)}>
              <div {...stylex.props(styles.scheduleTime, space.y(2.5))}>{item.time}</div>
              <div {...stylex.props(space.y(2.5))}>{item.topic}</div>
              {item.speakersInfo && (
                <div
                  {...stylex.props(space.y(2.5))}
                  dangerouslySetInnerHTML={{ __html: item.speakersInfo }}
                />
              )}
              {item.instruction && (
                <p
                  {...stylex.props(space.y(2.5))}
                  dangerouslySetInnerHTML={{ __html: item.instruction }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
