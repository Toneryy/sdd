// src/components/Users/Profile/ModalWrapper.tsx
import { useRef } from "react";
import styles from "./Modal.module.scss";

export default function ModalWrapper({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  const downOnBackdrop = useRef(false);

  return (
    <div
      className={styles.backdrop}
      onPointerDown={(e) => {
        downOnBackdrop.current = e.target === e.currentTarget;
      }}
      onPointerUp={(e) => {
        if (downOnBackdrop.current && e.target === e.currentTarget) onClose();
        downOnBackdrop.current = false;
      }}
    >
      {/* !!! без внутренней .modal */}
      {children}
    </div>
  );
}
