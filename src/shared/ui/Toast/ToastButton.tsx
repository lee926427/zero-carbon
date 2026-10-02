import type { HTMLAttributes } from "react";
import { Toast } from "@base-ui/react/toast";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  button: {
    backgroundColor: "transparent",
    borderWidth: "0px",
    paddingInline: "0px",
    paddingBlock: "0px",
  },
});

export function ToastButton({
  children,
  "aria-label": ariaLabel,
}: Pick<HTMLAttributes<HTMLButtonElement>, "children" | "aria-label">) {
  const toastManager = Toast.useToastManager();

  const handleClick = () => {
    toastManager.add({
      title: "已複製連結至剪貼簿",
    });
  };

  return (
    <button {...stylex.props(styles.button)} aria-label={ariaLabel} onClick={handleClick}>
      {children}
    </button>
  );
}
