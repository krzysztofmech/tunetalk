"use client";
import React, { useEffect, useRef, useState } from "react";

interface SliderProps {
  value: number;
  max: number;
  min: number;
  step: number;
}

export const Slider: React.FC<SliderProps> = ({ value, max, min, step }) => {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<any | null>(null);
  useEffect(() => {
    if (progressRef.current && progressRef.current.style) {
      const progressPercent = 100 / max;
      progressRef.current.style.width = `${progress * progressPercent}%`;
    }
  }, [progress]);

  const handleChange = (e: any) => {
    setProgress(e.target.value);
  };

  return (
    <>
      <div className="relative w-full h-2">
        <label
          ref={progressRef}
          className="absolute inset-0 z-10 h-full pointer-events-none rounded-full bg-pink-400 w-0"
        ></label>
        <input
          type="range"
          defaultValue={min}
          step={step}
          min={min}
          max={max}
          className="w-full absolute inset-0 bg-dark-600 rounded-3xl cursor-pointer focus:outline-none focus:outline-0 appearance-none [-webkit-appearance:none] [&::-webkit-slider-runnable-track]:h-full [&::-moz-range-track]:h-full [&::-webkit-slider-runnable-track]:rounded-full [&::-moz-range-track]:rounded-full [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:[-webkit-appearance:none] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:[-webkit-appearance:none] [&::-moz-range-thumb]:rounded-full [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-webkit-slider-thumb]:border-0 [&::-moz-range-thumb]:bg-pink-400 [&::-webkit-slider-thumb]:bg-pink-400 [&::-moz-range-thumb]:relative [&::-webkit-slider-thumb]:relative [&::-moz-range-thumb]:z-20 [&::-webkit-slider-thumb]:z-20 [&::-moz-range-thumb]:w-4 [&::-webkit-slider-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-webkit-slider-thumb]:h-4 [&::-moz-range-thumb]:top-1/2 [&::-webkit-slider-thumb]:top-1/2 [&::-moz-range-thumb]:-translate-y-1/2 [&::-webkit-slider-thumb]:-translate-y-1/2"
          onChange={handleChange}
        />
      </div>
    </>
  );
};
