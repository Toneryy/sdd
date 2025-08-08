// src/utils/notifyOnce.ts
import { toast, ToastOptions } from "react-toastify";

export function notifyOnce(
  fn: (msg: string, opts?: ToastOptions) => React.ReactText,
  msg: string,
  id: string,
  opts?: ToastOptions
) {
  if (!toast.isActive(id)) {
    fn(msg, { toastId: id, ...opts });
  }
}
