import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import * as Helper from "../../../utils/Helper";

function StatCard2({
  title,
  value,
  showDaysInput = false,
  inactiveDays,
  setInactiveDays,
}) {
  const theme = useTheme();
  const [displayValue, setDisplayValue] = React.useState(value);

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue) && newValue > 0) {
      setInactiveDays((prev) => {
        return newValue;
      });
      setDisplayValue(value); // Keeps the existing value logic
    }
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
            <TextField
              type="number"
              size="small"
              variant="outlined"
              value={inactiveDays}
              onChange={handleChange}
              sx={{ width: 80 }}
              inputProps={{ min: 1 }}
            />
          )}
        </Stack>
        <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
          <Typography variant="h4" component="p">
            {displayValue}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

StatCard2.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  showDaysInput: PropTypes.bool, // Optional prop to toggle the input field
};

export default StatCard2;
