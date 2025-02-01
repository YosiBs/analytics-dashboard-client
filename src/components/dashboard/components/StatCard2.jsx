import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

function StatCard2({
  title,
  value,
  showDaysInput = false,
  inactiveDays,
  setInactiveDays,
  totalUsers,
}) {
  const theme = useTheme();

  const handleChange = (event) => {
    let newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue) && newValue > 0 && newValue !== inactiveDays) {
      setInactiveDays(newValue);
    }
  };

  const handleIncrement = () => {
    setInactiveDays((prev) => Math.max(prev + 5, 5)); // Increase by 5, min 5
  };

  const handleDecrement = () => {
    setInactiveDays((prev) => Math.max(prev - 5, 5)); // Decrease by 5, min 5
  };

  return (
    <Card variant="outlined" sx={{ height: "100%", flexGrow: 1 }}>
      <CardContent>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}
        >
          <Typography component="h2" variant="subtitle2">
            {title}
          </Typography>
          {showDaysInput && (
            <Stack direction="row" spacing={1} alignItems="center">
              <TextField
                type="number"
                size="small"
                variant="outlined"
                value={inactiveDays}
                onChange={handleChange}
                sx={{ width: 62 }}
                inputProps={{ min: 5, step: 5 }} // Ensure increments of 5
              />
              <Box
                sx={{ display: "flex", justifyContent: "right", flexGrow: 1 }}
              >
                <Typography>Days</Typography>
              </Box>
            </Stack>
          )}
        </Stack>

        <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
          <Typography variant="h4" component="p">
            {`${totalUsers}/${value}`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

StatCard2.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  showDaysInput: PropTypes.bool,
  inactiveDays: PropTypes.number.isRequired,
  setInactiveDays: PropTypes.func.isRequired,
  totalUsers: PropTypes.number.isRequired,
};

export default StatCard2;
