import React from "react";

interface InputFieldProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  options?: { value: string; label: string }[];
  className?: string;
  min?: string; // ⭐ Optional for dates
  max?: string; // ⭐ Optional for dates
}

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  options = [],
  className = "",
  min,
  max,
}) => {
  const baseStyles =
    "w-full p-3 border border-gray-300 rounded-lg focus:outline-none";

  // SELECT FIELD
  if (type === "select") {
    return (
      <select
        value={value}
        onChange={onChange}
        className={`${baseStyles} ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  // INPUT FIELD (includes type="date")
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      className={`${baseStyles} ${className}`}
    />
  );
};

export default InputField;
