import { useEffect, useRef } from "react";

export default function Modal({ open, onDismiss, children }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement) return;
    console.log("Modal ref:", modalRef.current);
    open ? modalElement.showModal() : modalElement.close();
  }, [open]);

  function handleBackdropClick(e) {
    if (e.target === modalRef.current) {
      onDismiss();
    }
  }

  return (
    <dialog
      className="summary"
      ref={modalRef}
      onMouseDown={handleBackdropClick}
      onCancel={(e) => {
        e.preventDefault();
        onDismiss();
      }}>
      <div className="summary" onMouseDown={(e) => e.stopPropagation()}>
        {children}
      </div>
    </dialog>
  );
}
