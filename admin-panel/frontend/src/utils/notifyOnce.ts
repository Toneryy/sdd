// src/utils/notifyOnce.ts
import { toast, ToastOptions, ToastContent, Id } from "react-toastify";

export function notifyOnce(
  fn: (content: ToastContent, opts?: ToastOptions) => Id,
  msg: ToastContent,
  id: Id,
  opts?: ToastOptions
): void {
  console.log("notifyOnce called, active?", toast.isActive(id));
  if (!toast.isActive(id)) {
    fn(msg, { toastId: id, ...opts });
  }
}
