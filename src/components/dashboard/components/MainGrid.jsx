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
import * as usersService from "../../../services/usersService";
import * as Helper from "../../../utils/Helper";
import * as localStorageHelper from "../../../utils/localStorageHelper";

export default function MainGrid({ currAppId }) {
  const [data, setData] = React.useState([]);

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
      //const events = await usersService.getEventsByAppId(appId); // Example endpoint

      console.log("Users fetched:", users);
      console.log("Crashes fetched:", crashes);
      //console.log("Events fetched:", events);

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
          value: String(crashes.length) || 0,
          interval: "Last 30 days",
          trend:
            Helper.calculateTrend(Helper.getLogsJoinedInLast30Days(crashes)) ==
            "up"
              ? "down"
              : "up",
          data: Helper.getLogsJoinedInLast30Days(crashes) || [], // Replace with actual crash data
        },
        // {
        //   title: "Events",
        //   value: events.total || 0,
        //   interval: "Last 30 days",
        //   trend: events.trend || "up",
        //   data: events.dailyCounts || [], // Replace with actual event data
        // },
      ];

      setData(cards); // Update the `data` state with the cards
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }, [currAppId]); // Empty dependency array ensures fetchData doesn't change

  // Call fetchData only once when the component mounts
  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

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
        <Grid size={{ xs: 12, md: 6 }}>
          <SessionsChart />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PageViewsBarChart />
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: "column", sm: "row", lg: "column" }}>
            <CustomizedTreeView />
            <ChartUserByCountry />
          </Stack>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
