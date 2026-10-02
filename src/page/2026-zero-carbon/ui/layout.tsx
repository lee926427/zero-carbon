import * as stylex from "@stylexjs/stylex";
import { Hero } from "./Hero";
import { color, fontFamily } from "@/shared/styles/tokens.stylex";
import { Description } from "./Description";
import { ActivityVideos } from "./ActivityVideo";
import { Speakers } from "./Speakers";
import { Schedule } from "./Schedule";
import { Reports } from "./Reports";
import { Registration } from "./Registration";
import { Partners } from "./Partners";
import { CopyRight } from "./CopyRight";
import { Navigation, type NavItem } from "./Navigation";
import { ScrollToTopButton } from "./ScrollToTopButton";

const navLists: NavItem[] = [
  {
    title: "論壇簡介",
    id: "introduction",
  },
  {
    title: "活動影音",
    id: "video",
  },
  {
    title: "與會陣容",
    id: "speakers",
  },
  {
    title: "論壇議程",
    id: "schedule",
  },
  {
    title: "相關報導",
    id: "related-post",
  },
  {
    title: "報名資訊",
    id: "registration",
  },
  {
    title: "共同推動",
    id: "partners",
  },
];
const styles = stylex.create({
  base: {
    backgroundColor: color.primary,
    fontFamily: fontFamily.NotoSansTC,
    color: color.secondary,
  },
});

export function ResilientTaiwan2026Layout() {
  return (
    <div {...stylex.props(styles.base)}>
      <Navigation navLists={navLists} />
      <Hero />
      <Description />
      <ActivityVideos />
      <Speakers />
      <Schedule />
      <Reports />
      <Registration />
      <Partners />
      <CopyRight />
      <ScrollToTopButton />
    </div>
  );
}
