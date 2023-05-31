import React, { MouseEvent, ReactNode, useState } from "react";
import {
  Menu as MuiMenu,
  MenuItem,
  IconButton,
  Box,
  ListItemIcon,
  ListItemText,
  Icon,
} from "@mui/material";
import { IOption } from "./types/menu";
interface MenuProps {
  options: IOption[];
  children: ReactNode;
}

export const Menu: React.FC<MenuProps> = ({ options, children }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton
        onClick={(e: MouseEvent<HTMLElement>) => handleClick(e)}
        sx={{ p: 0 }}
      >
        {children}
      </IconButton>
      <MuiMenu
        color="primary.500"
        anchorEl={anchorEl}
        id="menu-appbar"
        keepMounted
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {options.map(({ icon, text }) => (
          <MenuItem key={text} onClick={handleClose} color="primary">
            {!!icon && (
              <ListItemIcon>
                <Icon component={icon} />
              </ListItemIcon>
            )}

            <ListItemText>{text}</ListItemText>
          </MenuItem>
        ))}
      </MuiMenu>
    </Box>
  );
};
