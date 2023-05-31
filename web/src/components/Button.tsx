import React from "react";
import { Button as MuiButton } from "@mui/material";
import { variant } from "./types/button";
interface ButtonProps {
  text: string;
  variant?: variant;
  handleClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  variant = "contained",
  handleClick,
}) => {
  return (
    <MuiButton color="secondary" variant={variant} onClick={handleClick}>
      {text}
    </MuiButton>
  );
};
