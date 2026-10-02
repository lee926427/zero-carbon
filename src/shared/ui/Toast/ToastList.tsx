import { Toast } from "@base-ui/react/toast";
import * as stylex from "@stylexjs/stylex";
import { typography } from "@/shared/styles/typography.stylex";
import { color } from "@/shared/styles/tokens.stylex";

const styles = stylex.create({
  toastContent: {
    backgroundColor: color.secondary,
    padding: "8px 16px",
    borderRadius: "8px",
    marginTop: "16px",
  },
  toastTitle: {
    color: "white",
  },
});

export function ToastList() {
  const { toasts } = Toast.useToastManager();
  return toasts.map((toast) => (
    <Toast.Root key={toast.id} toast={toast} swipeDirection="up">
      <Toast.Content>
        <div {...stylex.props(styles.toastContent)}>
          <Toast.Title {...stylex.props(styles.toastTitle, typography.toastTitle)} />
        </div>
      </Toast.Content>
    </Toast.Root>
  ));
}
