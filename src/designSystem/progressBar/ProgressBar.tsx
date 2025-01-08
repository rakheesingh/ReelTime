import React, { useState, useRef } from "react";

interface ProgressBarProps {
  minValue: number;
  maxValue: number;
  handleSelection: (value: number, arg: string) => void; // Event handler for both handles
  minQuery: string;
  maxQuery: string;
}

export default function ProgressBar({ minValue, maxValue, handleSelection, minQuery, maxQuery}: ProgressBarProps) {

  const progressRef = useRef<HTMLDivElement>(null);
  const [currentMinValue, setCurrentMinValue] = useState(minValue);
  const [currentMaxValue, setCurrentMaxValue] = useState(maxValue);
  const [activeHandle, setActiveHandle] = useState<"min" | "max" | null>(null);

  const progressBarWidth = maxValue - minValue;

  // Calculate percentages for both handles
  const minPercentage = ((currentMinValue - minValue) / progressBarWidth) * 100;
  const maxPercentage = ((currentMaxValue - minValue) / progressBarWidth) * 100;

  const handleMouseDown = (handle: "min" | "max") => {
    setActiveHandle(handle);
    const arg = handle === "min" ? minQuery : maxQuery;
    let newValue: number;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (progressRef.current) {
        const progressBarRect = progressRef.current.getBoundingClientRect();
        const newX = moveEvent.clientX - progressBarRect.left;
        newValue = Math.max(
          minValue,
          Math.min(
            maxValue,
            ((newX / progressBarRect.width) * progressBarWidth) + minValue
          )
        );

        if (handle === "min") {
          if (newValue <= currentMaxValue) {
            setCurrentMinValue(newValue);
          }
        } else if (handle === "max") {
          if (newValue >= currentMinValue) {
            setCurrentMaxValue(newValue);
          }
        }
      }
    };

    const handleMouseUp = () => {
      setActiveHandle(null);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      // Notify parent with updated values
      handleSelection(newValue, arg);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className="w-64 h-1 bg-gray-800 rounded-lg relative"
      ref={progressRef}
    >
      {/* Progress bar */}
      <div
        className="h-full bg-brand_lightBlue absolute"
        style={{
          left: `${minPercentage}%`,
          width: `${maxPercentage - minPercentage}%`,
        }}
      />

      {/* Min handle */}
      <div
        className="w-4 h-4 rounded-full bg-brand_lightBlue absolute top-[-5px] cursor-pointer"
        style={{ left: `${minPercentage}%` }}
        onMouseDown={() => handleMouseDown("min")}
      />

      {/* Max handle */}
      <div
        className="w-4 h-4 rounded-full bg-brand_lightBlue absolute top-[-5px] cursor-pointer"
        style={{ left: `${maxPercentage}%` }}
        onMouseDown={() => handleMouseDown("max")}
      />
    </div>
  );
}
