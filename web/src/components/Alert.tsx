import React, { ReactNode } from "react";
import { Alert as MuiAlert, AlertProps as MuiAlertProps } from "@mui/material";
interface AlertProps extends MuiAlertProps {
  children: ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ children, ...rest }) => {
  return (
    <MuiAlert
      {...rest}
      sx={{ backgroundColor: "#322e2d", color: "#ffffff", ...rest.sx }}
    >
      {children}
    </MuiAlert>
  );
};
