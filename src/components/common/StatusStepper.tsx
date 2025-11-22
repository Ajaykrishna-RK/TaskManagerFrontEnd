import React from "react";

interface StatusStepperProps {
  steps: string[];
  active: string;
  onChange?: (status: string) => void;

}

export default function StatusStepper({
  steps,
  active,
  onChange,
}: StatusStepperProps) {
  return (
    <div className="flex items-center gap-3">
      {steps.map((step) => {
        const isActive = active === step;

        return (
          <div
            key={step}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => onChange?.(step)}
          >
            {/* Dot */}
            <div
              className={`w-3 h-3 rounded-full ${
                isActive ? "bg-blue-600" : "bg-gray-300"
              }`}
            ></div>

            {/* Text */}
            <span className="whitespace-nowrap text-[10px] text-gray-600 mt-1 capitalize">
              {step.replace("-", " ")}
            </span>
          </div>
        );
      })}
    </div>
  );
}
