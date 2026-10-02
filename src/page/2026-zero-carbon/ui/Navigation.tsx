import * as stylex from "@stylexjs/stylex";
import { Link } from "@tanstack/react-router";
import logo from "./logo.svg";
import { color, styleVars } from "@/shared/styles/tokens.stylex";
import { media } from "@/shared/styles/constants.stylex";
import { Menu } from "lucide-react";
import { Drawer } from "@base-ui/react/drawer";
import { useEffect, useMemo, useState } from "react";
import { typography } from "@/shared/styles/typography.stylex";
import { Toast } from "@base-ui/react";
import { ToastButton, ToastList } from "@/shared";
import linkIcon from "@/page/2026-zero-carbon/ui/linkIcon.svg";
import fbIcon from "@/page/2026-zero-carbon/ui/fbIcon.svg";
import lineIcon from "@/page/2026-zero-carbon/ui/lineIcon.svg";
import { ShareButton } from "./ShareButton";
import { ShareLink } from "@/shared/ui/ShareLink";

export type NavItem =
  | {
      title: "論壇簡介";
      id: "introduction";
    }
  | {
      title: "活動影音";
      id: "video";
    }
  | {
      title: "與會陣容";
      id: "speakers";
    }
  | {
      title: "論壇議程";
      id: "schedule";
    }
  | {
      title: "相關報導";
      id: "related-post";
    }
  | {
      title: "報名資訊";
      id: "registration";
    }
  | {
      title: "共同推動";
      id: "partners";
    };

export type NavTitle =
  | "論壇簡介"
  | "活動影音"
  | "與會陣容"
  | "論壇議程"
  | "相關報導"
  | "報名資訊"
  | "共同推動";

const styles = stylex.create({
  hidden: {
    transform: "translateY(-100%)",
  },
  visible: {
    transform: "translateY(0)",
  },
  indent: {
    marginBottom: {
      default: "54px",
      [media.desktop]: "76px",
    },
  },
  container: {
    height: {
      default: "54px",
      [media.desktop]: "76px",
    },
    display: "flex",
    alignItems: "center",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: color.accent,
    padding: {
      default: "12px 12px 12px 20px",
      [media.desktop]: "0px 28px",
    },
    transition: "transform 0.3s ease-in-out",
    zIndex: 5,
  },
  trigger: {
    display: {
      default: "flex",
      [media.tablet]: "none",
    },
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: "12px",
    right: "12px",
    marginLeft: {
      default: "auto",
      [media.desktop]: 0,
    },
    borderColor: "white",
    backgroundColor: "black",
    borderRadius: "100%",
    borderStyle: "none",
    padding: "4px",
    zIndex: 100,
  },
  icon: {
    stroke: "white",
    transition: "transform 0.3s ease-in-out",
    width: "20px",
    height: "20px",
  },
  menuClose: {
    transform: "rotate(0deg)",
  },
  menuOpen: {
    transform: "rotate(90deg)",
  },
  nav: {
    display: {
      default: "none",
      [media.tablet]: "flex",
    },
    marginLeft: "auto",
  },
  ul: {
    marginLeft: "auto",
    display: "flex",
    gap: "30px",
    margin: "0px auto",
    listStyleType: "none",
    paddingLeft: 0,
    marginBlockStart: 0,
    marginBlockEnd: 0,
    marginInlineStart: 0,
    marginInlineEnd: 0,
  },
  link: {
    color: "white",
    textDecorationLine: "none",
    padding: "10px",
  },
  viewport: {
    position: "fixed",
    inset: "0",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  toast: {
    position: "fixed",
    top: {
      default: "54px",
      [media.desktop]: "76px",
    },
    left: "50%",
    transform: "translateX(-50%)",
  },
  drawerNav: {
    display: "flex",
    justifyContent: "center",
  },
  drawerUl: {
    display: "flex",
    width: "fit-content",
    flexDirection: "column",
    gap: "30px",
    paddingTop: "88px",
    paddingBottom: "80px",
    paddingLeft: 0,
    listStyleType: "none",
    marginBlockStart: 0,
    marginBlockEnd: 0,
    marginInlineStart: 0,
    marginInlineEnd: 0,
  },
  drawerShare: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    boxSizing: "border-box",
    width: "100vw",
    height: "100vh",
    marginBottom: `calc(-1 * ${styleVars.bleed})`,
    padding: "1rem 1.5rem 1.5rem",
    paddingBottom: `calc(1.5rem + env(safe-area-inset-bottom, 0px) + ${styleVars.bleed})`,
    borderTop: "1px solid oklch(14.5% 0 0deg)",
    backgroundColor: "#333",
    color: "oklch(14.5% 0 0deg)",
    outline: 0,
    boxShadow: "0.25rem 0.25rem 0 rgb(0 0 0 / 12%)",
    overflowY: "auto",
    overscrollBehavior: "contain",
    transition: "transform 450ms cubic-bezier(0.32, 0.72, 0, 1)",
    willChange: "transform",
    transform: {
      default: "translateX(var(--drawer-swipe-movement-x))",
      "[data-starting-style]": `translateX(100%)`,
      "[data-ending-style]": `translateX(calc(${styleVars.bleed} + 100%))`,
    },
    transitionDuration: {
      "[data-ending-style]": "calc(var(--drawer-swipe-strength) * 400ms)",
    },
    zIndex: 5,
  },
});

export type NavigationProps = {
  navLists: NavItem[];
};

export function Navigation({ navLists }: NavigationProps) {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (prevScrollPos > currentScrollPos) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <Toast.Provider>
      <Drawer.Provider>
        <Drawer.IndentBackground />
        <Drawer.Indent {...stylex.props(styles.indent)}>
          <Drawer.Root open={open} onOpenChange={setOpen} swipeDirection="right">
            <div {...stylex.props(styles.container, isVisible ? styles.visible : styles.hidden)}>
              <a href="https://www.mirrormedia.mg" target="_blank" rel="noopener">
                <img src={logo} alt="Mirror Media" />
              </a>
              <nav {...stylex.props(styles.nav)}>
                <ul {...stylex.props(styles.ul)}>
                  {navLists.map((navItem) => (
                    <li key={navItem.id}>
                      <Link
                        to="/2026-zero-carbon"
                        hash={navItem.id}
                        {...stylex.props(styles.link, typography.navigation)}
                      >
                        {navItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <Drawer.Trigger {...stylex.props(styles.trigger)}>
                <Menu {...stylex.props(styles.icon, open ? styles.menuOpen : styles.menuClose)} />
              </Drawer.Trigger>
              <ShareButton>
                <ShareLink href="" ariaLabel="分享到 facebook">
                  <img src={fbIcon} width={24} height={24} alt="fb" />
                </ShareLink>
                <ShareLink href="" ariaLabel="分享到 line">
                  <img src={lineIcon} width={24} height={24} alt="line" />
                </ShareLink>
                <ToastButton>
                  <img src={linkIcon} width={24} height={24} alt="link" />
                </ToastButton>
              </ShareButton>
            </div>
            <Toast.Portal>
              <Toast.Viewport {...stylex.props(styles.toast)}>
                <ToastList />
              </Toast.Viewport>
            </Toast.Portal>

            <Drawer.SwipeArea />
            <Drawer.Portal>
              <Drawer.Backdrop />
              <Drawer.Viewport {...stylex.props(styles.viewport)}>
                <Drawer.Popup {...stylex.props(styles.popup)}>
                  <Drawer.Content>
                    <nav {...stylex.props(styles.drawerNav)}>
                      <ul {...stylex.props(styles.drawerUl)}>
                        {navLists.map((navItem) => (
                          <li key={navItem.id}>
                            <Link
                              to="/2026-zero-carbon"
                              hash={navItem.id}
                              {...stylex.props(styles.link, typography.navigation)}
                              onClick={() => setOpen(false)}
                            >
                              {navItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                    <div {...stylex.props(styles.drawerShare)}>
                      <ShareLink href="" ariaLabel="分享到 facebook">
                        <img src={fbIcon} width={24} height={24} alt="fb" />
                      </ShareLink>
                      <ShareLink href="" ariaLabel="分享到 line">
                        <img src={lineIcon} width={24} height={24} alt="line" />
                      </ShareLink>
                      <ToastButton>
                        <img src={linkIcon} width={24} height={24} alt="link" />
                      </ToastButton>
                    </div>
                  </Drawer.Content>
                </Drawer.Popup>
              </Drawer.Viewport>
            </Drawer.Portal>
          </Drawer.Root>
        </Drawer.Indent>
      </Drawer.Provider>
    </Toast.Provider>
  );
}
