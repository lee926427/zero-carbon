import { color } from "@/shared/styles/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import React, { useEffect, useState } from "react";

const styles = stylex.create({
  wrapper: {
    display: "flex",
  },
  viewport: {
    overflow: "hidden",
  },
  container: {
    display: "flex",
    touchAction: "pan-y pinch-zoom",
  },
  slide_item: {
    flex: "0 0 100%",
    minWidth: 0,
  },
  prevBtn: {
    paddingRight: "1rem",
    backgroundColor: "transparent",
    borderColor: "transparent",
    cursor: "pointer",
  },
  nextBtn: {
    paddingLeft: "1rem",
    backgroundColor: "transparent",
    borderColor: "transparent",
    cursor: "pointer",
  },
  dots: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "14px",
  },
  dot: {
    display: "inline-block",
    width: "12px",
    aspectRatio: 1 / 1,
    borderRadius: "100%",
    backgroundColor: color.secondary,
  },
  dotButton: {
    borderColor: "transparent",
    borderWidth: "0px",
    cursor: "pointer",
    backgroundColor: "transparent",
  },
  dotSelected: {
    backgroundColor: color.accent,
  },
});

interface EmblaCarouselProps {
  children: React.ReactNode;
  options?: Partial<EmblaOptionsType>;
  plugins?: EmblaPluginType[];
  renderPrevIcon?: React.ReactNode;
  renderNextIcon?: React.ReactNode;
}

export function EmblaCarousel({
  children,
  options,
  plugins,
  renderPrevIcon,
  renderNextIcon,
}: EmblaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedSnap, setSelectedSnap] = useState(0);

  const goToPrev = () => emblaApi?.scrollPrev();
  const goToNext = () => emblaApi?.scrollNext();
  const goTo = (index: number) => emblaApi?.scrollTo(index);
  const setupSnaps = (emblaApi: EmblaCarouselType) => setScrollSnaps(emblaApi.scrollSnapList());
  const setActiveSnap = (emblaApi: EmblaCarouselType) =>
    setSelectedSnap(emblaApi.selectedScrollSnap());

  useEffect(() => {
    if (!emblaApi) return;

    setupSnaps(emblaApi);
    setActiveSnap(emblaApi);

    emblaApi.on("reInit", setupSnaps);
    emblaApi.on("reInit", setActiveSnap);
    emblaApi.on("select", setActiveSnap);
  }, [emblaApi]);

  return (
    <>
      <div {...stylex.props(styles.wrapper)}>
        <button {...stylex.props(styles.prevBtn)} onClick={goToPrev}>
          {renderPrevIcon}
        </button>
        <div ref={emblaRef} {...stylex.props(styles.viewport)}>
          <div {...stylex.props(styles.container)}>
            {React.Children.map(children, (child) => (
              <div {...stylex.props(styles.slide_item)}>{child}</div>
            ))}
          </div>
        </div>
        <button {...stylex.props(styles.nextBtn)} onClick={goToNext}>
          {renderNextIcon}
        </button>
      </div>
      <div {...stylex.props(styles.dots)}>
        {scrollSnaps.map((_, index) => (
          <button key={index} {...stylex.props(styles.dotButton)} onClick={() => goTo(index)}>
            <span {...stylex.props(styles.dot, index === selectedSnap && styles.dotSelected)} />
          </button>
        ))}
      </div>
    </>
  );
}
