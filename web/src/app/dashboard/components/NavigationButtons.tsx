import { Menu } from "@/components/Menu";
import { IOption } from "@/components/types/menu";
import { MoreVert, People, Notifications, List } from "@mui/icons-material";
import { IconButton, Box, Badge, Icon } from "@mui/material";
import React from "react";

interface NavigationButtonsProps {}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({}) => {
  const options: IOption[] = [
    {
      icon: People,
      text: "Chat rooms",
    },
    {
      icon: List,
      text: "Your playlists",
    },
  ];
  return (
    <>
      <Menu options={options}>
        <IconButton
          color="primary"
          size="large"
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          <MoreVert />
        </IconButton>
      </Menu>
      <Box
        marginRight={10}
        sx={{
          display: { xs: "none", md: "flex" },
        }}
      >
        {options.map(({ icon, text }) => (
          <>
            <IconButton color="primary" size="large">
              <Icon component={icon!} />
            </IconButton>
          </>
        ))}
      </Box>
    </>
  );
};
