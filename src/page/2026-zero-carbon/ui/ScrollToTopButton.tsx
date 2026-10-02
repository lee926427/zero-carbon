import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import { media } from "@/shared/styles/constants.stylex";
import { color } from "@/shared/styles/tokens.stylex";

const styles = stylex.create({
  button: {
    position: "fixed",
    top: "calc(100vh - 100px)",
    right: {
      default: "28px",
      [media.tablet]: "35px",
      [media.desktop]: "48px",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderStyle: "none",
    borderRadius: "50%",
    backgroundColor: color.accent,
    boxShadow: "1px 1px 3px 0px hsla(0, 0%, 0%, 0.15)",
    zIndex: 5,
  },
});

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const screenHeight = window.innerHeight;
      setIsVisible(scrollTop > screenHeight / 2);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button {...stylex.props(styles.button)} onClick={scrollToTop}>
      <ArrowUp stroke="white" />
    </button>
  );
}
