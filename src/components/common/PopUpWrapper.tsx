import React from "react";
import ButtonLayout from "./ButtonLayout";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function PopUpWrapper({
  open,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center p-4 items-center z-50">
      <div className="bg-white w-full max-w-4xl   rounded-lg shadow-lg p-6 relative">
        <ButtonLayout
          className="absolute cursor-pointer bg-[white] right-4 top-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </ButtonLayout>

        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

        {children}
      </div>
    </div>
  );
}
