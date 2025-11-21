import React from "react";

function ErrorText({ text }: { text?: string }) {
  return (
    <>
      <p className="text-red-500 text-xs">{text}</p>
    </>
  );
}

export default ErrorText;
