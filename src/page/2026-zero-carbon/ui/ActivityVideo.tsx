import { SectionWrapper } from "./SectionWrapper";
import { useLoaderData } from "@tanstack/react-router";
import * as stylex from "@stylexjs/stylex";
import ReactPlayer from "react-player";
import { EmblaCarousel } from "./EmblaCarousel";
import { media } from "@/shared/styles/constants.stylex";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { color } from "@/shared/styles/tokens.stylex";

const styles = stylex.create({
  container: {
    maxWidth: "1048px",
    margin: {
      default: "0px",
      [media.tablet]: "0 64px",
      [media.desktop]: "0 auto",
    },
  },
});

export function ActivityVideos() {
  const data = useLoaderData({ from: "/2026-zero-carbon/" });

  if (!data || !data.metadata.pageInfo.video.content) {
    return null;
  }

  return (
    <SectionWrapper title="活動影音" id="video">
      <div {...stylex.props(styles.container)}>
        <EmblaCarousel
          options={{ loop: true }}
          renderPrevIcon={<ChevronLeft color={color.accent} />}
          renderNextIcon={<ChevronRight color={color.accent} />}
        >
          {data.metadata.pageInfo.video.content.split(",").map((url, index) => (
            <ReactPlayer
              key={index}
              src={url}
              controls
              width="100%"
              height="100%"
              style={{ aspectRatio: "16 / 9" }}
            />
          ))}
        </EmblaCarousel>
      </div>
    </SectionWrapper>
  );
}
