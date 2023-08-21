"use client";
import React from "react";
import { variant } from "./types/button";

interface ButtonProps {
  text: string;
  variant: variant;
  href?: string;
  handleClick?: any;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  variant,
  href,
  handleClick,
}) => {
  const buttonStyles = () => {
    const bg =
      variant === "filled"
        ? "bg-pink-500 text-white"
        : variant === "outlined"
        ? "border border-pink-500 text-pink-500"
        : variant === "ghost"
        ? "text-pink-500"
        : "text-white";
    return `${bg} px-4 py-2 rounded`;
  };

  return (
    <>
      {href ? (
        <a href={href} className={buttonStyles()}>
          {text}
        </a>
      ) : (
        <button onClick={handleClick} className={buttonStyles()}>
          {text}
        </button>
      )}
    </>
  );
};
