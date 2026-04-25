import { useEffect, useRef } from "react";
import "../index.css";

export default function Modal({ open, onDismiss, children }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement) return;
    open ? modalElement.showModal() : modalElement.close();
  }, [open]);

  function handleBackdropClick(e) {
    if (e.target === modalRef.current) {
      onDismiss();
    }
  }

  return (
    <dialog
      ref={modalRef}
      onMouseDown={handleBackdropClick}
      onCancel={(e) => {
        e.preventDefault();
        onDismiss();
      }}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        {children}
      </div>
    </dialog>
  );
}
