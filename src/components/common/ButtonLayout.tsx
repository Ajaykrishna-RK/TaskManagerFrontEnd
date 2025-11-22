import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export default function ButtonLayout({
  children,
  onClick,
  type = "button",
  variant = "primary",    
  disabled = false,
  loading = false,
  className = "",
}: ButtonProps) {

  const baseStyles =
    "px-4 py-2 rounded-lg font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center";

  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
