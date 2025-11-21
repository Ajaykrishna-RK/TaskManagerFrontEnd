import { useState } from "react";

export const useValidation = <T extends object>() => {
  const [errors, setErrors] = useState<Partial<T>>({});

  const validate = (
    data: T,
    validationFn: (data: T) => Partial<T>
  ): boolean => {
    const newErrors = validationFn(data);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = () => setErrors({});

  return { errors, validate, clearErrors, setErrors };
};
