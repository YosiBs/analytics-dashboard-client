import * as React from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SelectContent from "./SelectContent";
import MenuContent from "./MenuContent";
import OptionsMenu from "./OptionsMenu";
import * as localStorageHelper from "../../../utils/localStorageHelper";
const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export default function SideMenu({ setCurrAppId }) {
  const [currentUser, setCurrentUser] = React.useState(null);
  // Function to get the current user
  const getCurrentUser = React.useCallback(() => {
    const temp = localStorageHelper.getUserFromLocalStorage();
    setCurrentUser(temp);
    console.log("Current user retrieved:", temp);
  }, []);
  // Use useEffect to call getCurrentUser only once when the component mounts
  React.useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          mt: "calc(var(--template-frame-height, 0px) + 4px)",
          p: 1.5,
        }}
      >
        {/* @@@@@ */}
        <SelectContent setCurrAppId={setCurrAppId} />
      </Box>
      <Divider />
      <MenuContent />

      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: "center",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Avatar
          sizes="small"
          alt={currentUser ? `${currentUser.name}` : "Loading..."}
          src="/static/images/avatar/7.jpg"
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: "auto" }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, lineHeight: "16px" }}
          >
            {currentUser ? `${currentUser.name}` : "Loading..."}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {currentUser ? `${currentUser.email}` : "Loading..."}
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}
