import { Toast } from "@base-ui/react/toast";
import { ToastButton } from "./ToastButton";
import { ToastList } from "./ToastList";

export function ToastProvider() {
  return (
    <Toast.Provider>
      <ToastButton />
      <Toast.Portal>
        <Toast.Viewport>
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}
