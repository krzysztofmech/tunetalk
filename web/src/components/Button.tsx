"use client";
import React from "react";
import { variant } from "./types/button";
import { IconType, IconBase } from "react-icons";
import { FaPlay } from "react-icons/fa6";

interface ButtonProps {
  variant: variant;
  text?: string;
  href?: string;
  handleClick?: any;
  icon?: IconType;
  style?: string;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  variant,
  href,
  handleClick,
  icon,
  style,
}) => {
  const buttonStyles = () => {
    const bg =
      variant === "filled"
        ? "bg-pink-500 text-white hover:bg-pink-400 active:bg-pink-600"
        : variant === "outlined"
        ? "border border-pink-500 text-pink-500 hover:bg-pink-400 hover:bg-opacity-20 hover:border-pink-400 active:bg-pink-400 active:bg-opacity-40"
        : variant === "ghost"
        ? "text-pink-500 hover:bg-pink-400 hover:bg-opacity-20 active:bg-pink-400 active:bg-opacity-40"
        : variant === "switch"
        ? "text-white"
        : variant === "white-ghost"
        ? "text-white hover:text-pink-400 active:text-pink-600"
        : "text-white hover:underline";
    return `${bg} p-4 rounded select-none ${style}`;
  };

  return (
    <>
      {href ? (
        <a href={href} className={buttonStyles()}>
          {text}
        </a>
      ) : icon ? (
        <button onClick={handleClick} className={buttonStyles()}>
          <IconBase children={icon({})} />
        </button>
      ) : (
        <button onClick={handleClick} className={buttonStyles()}>
          {text}
        </button>
      )}
    </>
  );
};
