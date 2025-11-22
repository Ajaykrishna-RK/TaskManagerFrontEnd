import React from "react";

interface TextComponentProps {
  text?: string;
  className?: string;
}

export default function TextComponent({
  text,
  className = "",
}: TextComponentProps) {
  return (
    <span className={`text-sm text-gray-700 ${className}`}>
      {text}
    </span>
  );
}
