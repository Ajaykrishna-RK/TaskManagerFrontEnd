import React from "react";

interface TrafficLightProps {
  value: "todo" | "in-progress" | "done";
  onChange: (v: "todo" | "in-progress" | "done") => void;
}

const stages = [
  { key: "todo", color: "bg-red-500", label: "Todo" },
  { key: "in-progress", color: "bg-yellow-400", label: "In Progress" },
  { key: "done", color: "bg-green-500", label: "Done" },
] as const;

export default function TrafficLightToggle({ value, onChange }: TrafficLightProps) {
  return (
    <div className="flex items-center gap-4">
      {stages.map((st) => (
        <div
          key={st.key}
          className="flex flex-col items-center cursor-pointer group"
          onClick={() => onChange(st.key)}
        >
          {/* Light */}
          <div
            className={`w-4 h-4 rounded-full transition-all duration-200 
              ${
                value === st.key
                  ? st.color + " shadow-[0_0_8px_rgba(0,0,0,0.3)] scale-110"
                  : "bg-gray-300 group-hover:opacity-70"
              }
            `}
          ></div>

          {/* Label */}
          <span
            className={`text-[10px] mt-1 transition 
              ${value === st.key ? "text-black font-medium" : "text-gray-500"}
            `}
          >
            {st.label}
          </span>
        </div>
      ))}
    </div>
  );
}
