import * as React from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Copyright from "../internals/components/Copyright";
import ChartUserByCountry from "./ChartUserByCountry";
import CustomizedTreeView from "./CustomizedTreeView";
import CustomizedDataGrid from "./CustomizedDataGrid";
import HighlightedCard from "./HighlightedCard";
import PageViewsBarChart from "./PageViewsBarChart";
import SessionsChart from "./SessionsChart";
import StatCard from "./StatCard";
import StatCard2 from "./StatCard2";
import * as usersService from "../../../services/usersService";
import * as Helper from "../../../utils/Helper";
import * as localStorageHelper from "../../../utils/localStorageHelper";

export default function MainGrid({ currAppId }) {
  const [data, setData] = React.useState([]);
  const [data2, setData2] = React.useState([]);
  const [logs, setLogs] = React.useState([]);
  const [dailyLoginlogs, setDailyLogin] = React.useState([]);
  const [userGeoData, setUserGeoData] = React.useState([]);
  const [inactiveDays, setInactiveDays] = React.useState(0);

  const fetchData = React.useCallback(async () => {
    if (!currAppId) return;
    try {
      console.log("Fetching data for App ID:", currAppId);

      // Fetch all necessary data
      const users = await usersService.getUsersByAppId(currAppId);
      const crashes = await usersService.getLogsByAppIdAndType(
        currAppId,
        "Crash"
      );
      const inactiveDays = 30;
      console.log("Users fetched:", users);
      console.log("Crashes fetched:", crashes);

      // Create cards for each category
      const cards = [
        {
          title: "Users",
          value: String(users.length) || 0,
          interval: "Last 30 days",
          trend: Helper.calculateTrend(
            Helper.getLogsJoinedInLast30Days(crashes)
          ),
          data: Helper.getUsersJoinedInLast30Days(users), // Replace with actual user-related data
        },
        {
          title: "Crashes",
          value: String(crashes.length) || -1,
          interval: "Last 30 days",
          trend:
            Helper.calculateTrend(Helper.getLogsJoinedInLast30Days(crashes)) ==
            "up"
              ? "down"
              : "up",
          data: Helper.getLogsJoinedInLast30Days(crashes) || [], // Replace with actual crash data
        },
      ];
      const temp = Helper.countInactiveUsers(users, inactiveDays);
      Helper.debugLog("temp", temp);
      const cards2 = [
        {
          title: "Inactive Users",
          value: temp || 0,
          showDaysInput: true,
        },
      ];
      setData2(cards2);
      setData(cards); // Update the `data` state with the cards
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }, [currAppId]); // Empty dependency array ensures fetchData doesn't change

  // Call fetchData only once when the component mounts
  React.useEffect(() => {
    fetchData();
  }, [fetchData]);
  //GET ALL LOGS------------------------------------------------------------------
  React.useEffect(() => {
    if (!currAppId) return;

    const fetchLogs = async () => {
      try {
        const fetchedLogs = await usersService.getAllLogsByAppId(currAppId);
        console.log("Fetched logs:", fetchedLogs);
        setLogs(fetchedLogs); // Update logs state
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, [currAppId]);
  //GET DAILY-LOGIN------------------------------------------------------------------
  React.useEffect(() => {
    const fetchDailyLoginLogs = async () => {
      try {
        const fetchedLogs = await usersService.getLogsByAppIdAndType(
          currAppId,
          "DailyLogin"
        );
        setDailyLogin(fetchedLogs);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };
    fetchDailyLoginLogs();
  }, [currAppId]);
  //GET COUNTRIES USERS COUNT------------------------------------------------------------------
  React.useEffect(() => {
    if (!currAppId) return;

    const fetchCountriesData = async () => {
      try {
        const response = await usersService.getUserCountPerCountryByAppId(
          currAppId
        );
        console.log("Fetched country data:", response);
        setUserGeoData(response); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountriesData();
  }, [currAppId]);
  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        {data2.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard2
              {...card}
              inactiveDays={inactiveDays}
              setInactiveDays={setInactiveDays}
            />
          </Grid>
        ))}
        <Grid size={{ xs: 12, md: 6 }}>
          {/* SESSION CHART */}
          <SessionsChart dailyLoginlogs={dailyLoginlogs} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PageViewsBarChart />
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Logs
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          {/* LOG TABLE */}
          <CustomizedDataGrid logs={logs} />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: "column", sm: "row", lg: "column" }}>
            {/* <CustomizedTreeView /> */}
            {/* COUNTRY DISTRIBUTION */}
            <ChartUserByCountry userGeoData={userGeoData} />
          </Stack>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
