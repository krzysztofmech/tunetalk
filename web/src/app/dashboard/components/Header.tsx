"use client";
import { SpotifyUser } from "@/gql/graphql";
import React, { useState } from "react";
import { Avatar, Box, Paper, Tooltip, Typography } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { Menu } from "@/components/Menu";
import { NavigationButtons } from "./NavigationButtons";
import { IOption } from "@/components/types/menu";
interface HeaderProps {
  user: SpotifyUser;
}

const settings: IOption[] = [
  {
    text: "Profile",
  },
  {
    text: "Account",
  },
  {
    text: "Dashboard",
  },
  {
    text: "Logout",
  },
];

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleCloseSettings = () => {
    setSettingsOpen(false);
  };

  return (
    <>
      <Paper
        elevation={4}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 2,
          paddingBottom: 2,
          paddingLeft: 5,
          paddingRight: 5,
          width: "95%",
          height: 80,
          position: "fixed",
          zIndex: 1,
          marginBottom: 150,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <MusicNoteIcon fontSize="large" />
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, userSelect: "none" }}
          >
            tunetalk
          </Typography>

          <NavigationButtons />
          {!!user && !!user.images && !!user.images[0] && (
            <>
              <Menu options={settings}>
                <Tooltip title={user.display_name} placement="top">
                  <Avatar
                    alt="Avatar"
                    src={user.images[0].url!}
                    sx={{
                      width: 50,
                      height: 50,
                    }}
                  />
                </Tooltip>
              </Menu>
            </>
          )}
        </Box>
      </Paper>
    </>
  );
};
