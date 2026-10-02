import { breakpoints, media } from "@/shared/styles/constants.stylex";
import * as stylex from "@stylexjs/stylex";
import { useLoaderData } from "@tanstack/react-router";

const styles = stylex.create({
  hero: {
    display: "block",
    width: "100vw",
    aspectRatio: {
      default: "4 / 3",
      [media.tablet]: "16 / 9",
    },
  },
});

export function Hero() {
  const data = useLoaderData({ from: "/2026-zero-carbon/" });

  if (!data) {
    return null;
  }

  return (
    <>
      <link rel="preload" href={data.metadata.pageInfo.heroImage_mobile.content} as="image" />
      <img
        {...stylex.props(styles.hero)}
        src={data.metadata.pageInfo.heroImage_mobile.content}
        alt="論壇簡介"
        sizes={[
          `(min-width: ${breakpoints.desktop}) 25vw`,
          `(min-width: ${breakpoints.tablet}) 50vw`,
          "100vw",
        ].join(", ")}
        srcSet={[
          `${data.metadata.pageInfo.heroImage_mobile.content} 320w`,
          `${data.metadata.pageInfo.heroImage_tablet.content} 768w`,
          `${data.metadata.pageInfo.heroImage_desktop.content} 1200w`,
        ].join(", ")}
      />
    </>
  );
}
