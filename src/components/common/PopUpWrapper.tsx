import { X } from "lucide-react";
import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  contentClassName?: string;
}

export default function PopUpWrapper({
  open,
  onClose,
  title,
  children,
  contentClassName = "",
}: ModalProps) {
  if (!open) return null;

  return (
    <div
      className={`
        fixed inset-0 bg-black/60 flex justify-center items-center p-4 z-50
  
      `}
    >
      <div
        className={`
          bg-white rounded-lg shadow-lg p-6 relative
          max-w-lg w-full   
          ${contentClassName} 
        `}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={28} />
        </button>

        {title && (
          <h2 className="text-xl text-center font-semibold mb-4 text-gray-700 pb-2">{title}</h2>
        )}

        {children}
      </div>
    </div>
  );
}
