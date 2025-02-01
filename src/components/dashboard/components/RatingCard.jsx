import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import * as Helper from "../../../utils/Helper";

function RatingCard({ title, averageRating, totalRaters, ratingBreakdown }) {
  const theme = useTheme();

  return (
    <Card variant="outlined" sx={{ height: "100%", flexGrow: 1 }}>
      <CardContent>
        {/* Headline */}
        <Typography component="h2" variant="subtitle2" sx={{ mb: 1 }}>
          {title}
        </Typography>

        {/* Rating Display */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <Rating value={averageRating} precision={0.1} readOnly />
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {(Number(averageRating) || 0).toFixed(1)}
          </Typography>
        </Stack>

        {/* Total Raters */}
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          {totalRaters} {totalRaters === 1 ? "review" : "reviews"}
        </Typography>

        {/* Optional: Rating Breakdown */}
        {ratingBreakdown && (
          <Box sx={{ mt: 2 }}>
            {Object.entries(ratingBreakdown)
              .sort(([a], [b]) => b - a) // Sort descending from 5 → 1
              .map(([stars, percentage]) => (
                <Stack
                  key={stars}
                  direction="row"
                  alignItems="center"
                  spacing={1}
                >
                  <Typography variant="body2">{stars} ★</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={Number(percentage)}
                    sx={{ flexGrow: 1, height: 6, borderRadius: 2 }}
                  />
                  <Typography variant="body2">{percentage}%</Typography>
                </Stack>
              ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

RatingCard.propTypes = {
  title: PropTypes.string.isRequired,
  averageRating: PropTypes.number.isRequired, // 0 - 5 scale
  totalRaters: PropTypes.number.isRequired,
  ratingBreakdown: PropTypes.object, // { 5: 70, 4: 20, 3: 5, 2: 3, 1: 2 }
};

export default RatingCard;
