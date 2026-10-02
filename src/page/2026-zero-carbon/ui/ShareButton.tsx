import { color } from "@/shared/styles/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { Share2 } from "lucide-react";
import { Collapsible } from "@base-ui/react/collapsible";
import { Children, type PropsWithChildren } from "react";
import { media } from "@/shared/styles/constants.stylex";

const ENTER_DURATION_MS = 200;
const STAGGER_MS = 60;

const styles = stylex.create({
  root: {
    position: "relative",
  },
  button: {
    cursor: "pointer",
    padding: "8px 16px",
    borderRadius: "8px",
    borderStyle: "none",
    backgroundColor: color.accent,
    color: "white",
  },
  panel: (childCount: number) => ({
    position: "absolute",
    top: {
      default: "130%",
      [media.desktop]: "160%",
    },
    left: "50%",
    transform: "translateX(-50%)",
    transitionProperty: "opacity",
    transitionDuration: `${ENTER_DURATION_MS + Math.max(0, childCount - 1) * STAGGER_MS}ms`,
    transitionTimingFunction: "ease",
    opacity: {
      default: 1,
      "@starting-style": 0,
      "@ending-style": 0,
    },
  }),
  ul: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  item: (index: number) => ({
    position: "relative",
    transitionProperty: "transform, opacity",
    transitionDuration: `${ENTER_DURATION_MS}ms`,
    transitionDelay: `${index * STAGGER_MS}ms`,
    transitionTimingFunction: "ease-in-out",
    transform: {
      default: "translateY(0)",
      "@starting-style": `translateY(-${index * 30}px)`,
      "@ending-style": `translateY(${index * 30}px)`,
    },
    zIndex: index,
  }),
});

interface ShareButtonProps {}

export function ShareButton({ children }: PropsWithChildren<ShareButtonProps>) {
  const childrenArray = Children.toArray(children);

  return (
    <Collapsible.Root {...stylex.props(styles.root)}>
      <Collapsible.Trigger {...stylex.props(styles.button)}>
        <Share2 />
      </Collapsible.Trigger>
      <Collapsible.Panel {...stylex.props(styles.panel(childrenArray.length))}>
        <ul {...stylex.props(styles.ul)}>
          {childrenArray.map((child, index) => (
            <li key={index} {...stylex.props(styles.item(index))}>
              {child}
            </li>
          ))}
        </ul>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}
