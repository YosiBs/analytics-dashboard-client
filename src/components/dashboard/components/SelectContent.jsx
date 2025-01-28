import * as React from "react";
import MuiAvatar from "@mui/material/Avatar";
import MuiListItemAvatar from "@mui/material/ListItemAvatar";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
import Select, { selectClasses } from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import SmartphoneRoundedIcon from "@mui/icons-material/SmartphoneRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import * as usersService from "../../../services/usersService"; // Replace with actual service
import * as localStorageHelper from "../../../utils/localStorageHelper";
const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  color: (theme.vars || theme).palette.text.secondary,
  border: `1px solid ${(theme.vars || theme).palette.divider}`,
}));

const ListItemAvatar = styled(MuiListItemAvatar)({
  minWidth: 0,
  marginRight: 12,
});

export default function SelectContent({ setCurrAppId }) {
  const [company, setCompany] = React.useState("");
  const [applications, setApplications] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [developerId, setDeveloperId] = React.useState("");

  const [appnameError, setAppnameError] = React.useState(false);
  const [appnameErrorMessage, setAppnameErrorMessage] = React.useState("");
  const [descriptionError, setDescriptionError] = React.useState(false);
  const [descriptionErrorMessage, setDescriptionErrorMessage] =
    React.useState("");
  const [appidError, setAppidError] = React.useState(false);
  const [appidErrorMessage, setAppidErrorMessage] = React.useState("");

  React.useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await usersService.getApplicationsByDeveloper();
      setApplications(response); // Assuming response.data is an array of applications
      // Set the first app as the default selected one
      if (response.length > 0) {
        setCompany(response[0].appid);
        setCurrAppId(response[0].appid);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const handleChange = (event) => {
    if (event.target.value === "add") {
      openAddProductDialog();
    } else {
      const selectedAppId = event.target.value;
      console.log("@ " + selectedAppId);
      setCompany(selectedAppId);
      setCurrAppId(selectedAppId);
    }
  };

  const openAddProductDialog = () => {
    const developerEmail =
      localStorageHelper.getUserFromLocalStorage()?.email || "";
    setDeveloperId(developerEmail); // Autofill developer email
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleAddProduct = async (newApp) => {
    try {
      await usersService.addNewApplication(newApp);
      handleCloseDialog();
      fetchApplications(); // Refresh the application list
    } catch (error) {
      console.error("Error adding new application:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (appidError || appnameError || descriptionError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      appid: data.get("appid"),
      appname: data.get("appname"),
      description: data.get("description"),
    });
    const newApp = {
      appId: data.get("appid"),
      developerEmail: developerId,
      name: data.get("appname"),
      description: data.get("description"),
    };
    handleAddProduct(newApp);
  };

  const validateInputs = () => {
    const description = document.getElementById("description");
    const appname = document.getElementById("appname");
    const appid = document.getElementById("appid");

    let isValid = true;

    if (!appid.value || appid.value.length < 1) {
      setAppidError(true);
      setAppidErrorMessage("App ID is required.");
      isValid = false;
    } else {
      setAppidError(false);
      setAppidErrorMessage("");
    }
    if (!appname.value || appname.value.length < 1) {
      setAppnameError(true);
      setAppnameErrorMessage("App Name is required.");
      isValid = false;
    } else {
      setAppnameError(false);
      setAppnameErrorMessage("");
    }
    if (!description.value || description.value.length < 1) {
      setDescriptionError(true);
      setDescriptionErrorMessage("Description is required.");
      isValid = false;
    } else {
      setDescriptionError(false);
      setDescriptionErrorMessage("");
    }

    return isValid;
  };
  //aaa
  return (
    <>
      <Select
        labelId="company-select"
        id="company-simple-select"
        value={company}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Select company" }}
        fullWidth
        sx={{
          maxHeight: 56,
          width: 215,
          "&.MuiList-root": {
            p: "8px",
          },
          [`& .${selectClasses.select}`]: {
            display: "flex",
            alignItems: "center",
            gap: "2px",
            pl: 1,
          },
        }}
      >
        <ListSubheader sx={{ pt: 0 }}>Production</ListSubheader>
        {applications ? (
          applications.length > 0 ? (
            applications.map((app, index) => (
              <MenuItem key={index || app.appid} value={app.appid}>
                <ListItemAvatar>
                  <Avatar alt={app.name}>
                    <SmartphoneRoundedIcon sx={{ fontSize: "1rem" }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={app.name} secondary="Mobile" />
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>
              <ListItemText primary="No applications found" />
            </MenuItem>
          )
        ) : (
          <MenuItem disabled>
            <ListItemText primary="No applications found" />
          </MenuItem>
        )}

        <Divider sx={{ mx: -1 }} />
        <MenuItem value="add">
          <ListItemIcon>
            <AddRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Add product" />
        </MenuItem>
      </Select>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        component="form"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Application</DialogTitle>
        <DialogContent>
          <Box
            // component="form"
            // onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="appid">App ID</FormLabel>
              <TextField
                name="appid"
                required
                fullWidth
                id="appid"
                placeholder="XXX-YYY-ZZZ"
                error={appidError}
                helperText={appidErrorMessage}
                color={appidError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="appname">App Name</FormLabel>
              <TextField
                required
                fullWidth
                id="appname"
                placeholder="MyAppName"
                name="appname"
                variant="outlined"
                error={appnameError}
                helperText={appnameErrorMessage}
                color={appnameError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="description">Description</FormLabel>
              <TextField
                name="description"
                required
                fullWidth
                id="description"
                placeholder="Jon Snow"
                error={descriptionError}
                helperText={descriptionErrorMessage}
                color={descriptionError ? "error" : "primary"}
              />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={validateInputs}
            variant="contained"
            color="primary"
            type="submit"
          >
            Add Application
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
