import { SectionWrapper } from "./SectionWrapper";
import * as stylex from "@stylexjs/stylex";
import { color } from "@/shared/styles/tokens.stylex";
import { EmblaCarousel } from "./EmblaCarousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useLoaderData } from "@tanstack/react-router";
import { format } from "date-fns/format";

const styles = stylex.create({
  container: {},
  image: {
    width: "100%",
  },
});

export function Reports() {
  const data = useLoaderData({ from: "/2026-zero-carbon/" });

  if (!data || !data.relatedPost || data.relatedPost.length === 0) {
    return null;
  }
  return (
    <SectionWrapper title="相關報導" id="related-post">
      <div {...stylex.props(styles.container)}>
        <EmblaCarousel
          options={{ loop: true }}
          renderPrevIcon={<ChevronLeft color={color.accent} />}
          renderNextIcon={<ChevronRight color={color.accent} />}
        >
          {data.relatedPost.map((post, index) => (
            <Link key={index} to={post.url} target="_blank" rel="noopener noreferrer nofollow">
              <div {...stylex.props(styles.container)}>
                <img
                  {...stylex.props(styles.image)}
                  src={post.heroImage?.resizedWebp.original}
                  alt={post.title}
                />
                <div>
                  <div>{post.title}</div>
                  <time dateTime={post.publishedDate}>
                    {format(new Date(post.publishedDate), "yyyy/MM/DD HH:mm")}
                  </time>
                </div>
              </div>
            </Link>
          ))}
        </EmblaCarousel>
      </div>
    </SectionWrapper>
  );
}
