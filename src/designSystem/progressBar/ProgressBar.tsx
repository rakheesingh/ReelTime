import React, { useState, useRef, useEffect } from "react";

interface ProgressBarProps {
  minValue: number;
  maxValue: number;
  handleSelection: (value: number, arg: string) => void; // Event handler for both handles
  minQuery: string;
  maxQuery: string;
}

export default function ProgressBar({
  minValue,
  maxValue,
  handleSelection,
  minQuery,
  maxQuery,
}: ProgressBarProps) {
  const progressRef = useRef<HTMLDivElement>(null);
  const [currentMinValue, setCurrentMinValue] = useState(minValue);
  const [currentMaxValue, setCurrentMaxValue] = useState(maxValue);
  const activeHandle = useRef<"min" | "max" | null>(null);
  const animationFrame = useRef<number | null>(null);

  const progressBarWidth = maxValue - minValue;

  const minPercentage = ((currentMinValue - minValue) / progressBarWidth) * 100;
  const maxPercentage = ((currentMaxValue - minValue) / progressBarWidth) * 100;

  const handleMouseDown = (handle: "min" | "max") => {
    activeHandle.current = handle;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (moveEvent: MouseEvent) => {
    if (!progressRef.current) return;
    const progressBarRect = progressRef.current.getBoundingClientRect();
    const newX = moveEvent.clientX - progressBarRect.left;

    const newValue = Math.floor(
      Math.max(
        minValue,
        Math.min(
          maxValue,
          ((newX / progressBarRect.width) * progressBarWidth) + minValue
        )
      )
    );

    if (animationFrame.current) cancelAnimationFrame(animationFrame.current);

    animationFrame.current = requestAnimationFrame(() => {
      if (activeHandle.current === "min" && newValue <= currentMaxValue) {
        setCurrentMinValue(newValue);
      } else if (activeHandle.current === "max" && newValue >= currentMinValue) {
        setCurrentMaxValue(newValue);
      }
    });
  };

  const handleMouseUp = () => {
    if (activeHandle.current) {
      const finalValue =
        activeHandle.current === "min" ? currentMinValue : currentMaxValue;
      const query = activeHandle.current === "min" ? minQuery : maxQuery;
      handleSelection(finalValue, query);
    }

    activeHandle.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = null;
    }
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
