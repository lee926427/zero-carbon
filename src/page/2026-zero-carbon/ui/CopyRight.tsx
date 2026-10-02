import { media } from "@/shared/styles/constants.stylex";
import { typography } from "@/shared/styles/typography.stylex";
import { color } from "@/shared/styles/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  base: {
    color: color.secondary,
    margin: {
      default: "0px 44px",
    },
    textAlign: "center",
    paddingTop: {
      default: "24px",
      [media.desktop]: "10px",
    },
    paddingBottom: {
      default: "50px",
      [media.mobile]: "24px",
      [media.desktop]: "36px",
    },
  },
});

export function CopyRight() {
  return (
    <div {...stylex.props(styles.base, typography.copyRight)}>
      <div>鏡報新聞網股份有限公司 版權所有</div>
      <div>
        Copyright © 2026 Mirror Daily INC. All rights reserved 本網站圖文非經本社同意不得刊載
      </div>
    </div>
  );
}
