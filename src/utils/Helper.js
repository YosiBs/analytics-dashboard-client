import axios from "axios";

export const getUsersJoinedInLast30Days = (users) => {
  const now = new Date(); // Get current date & time
  const today = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  ); // Normalize to start of today in UTC

  const last30Days = Array(30).fill(0); // Initialize an array of 30 zeros

  users.forEach((user) => {
    const firstSeenDate = new Date(user.firstseen); // Convert firstseen to Date object (UTC)

    // Ensure firstSeenDate is compared in UTC
    const firstSeenUTC = new Date(
      Date.UTC(
        firstSeenDate.getUTCFullYear(),
        firstSeenDate.getUTCMonth(),
        firstSeenDate.getUTCDate()
      )
    );

    const diffInDays = Math.floor(
      (today - firstSeenUTC) / (1000 * 60 * 60 * 24)
    ); // Difference in full days

    if (diffInDays >= 0 && diffInDays < 30) {
      last30Days[29 - diffInDays]++; // Increment the count for the correct day
    }
  });

  return last30Days; // Array of user counts per day for the last 30 days
};

export const getLast30Days = () => {
  const now = new Date(); // Get today's date
  const today = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  ); // Normalize to UTC
  const days = [];

  for (let i = 29; i >= 0; i--) {
    const pastDate = new Date(today);
    pastDate.setUTCDate(today.getUTCDate() - i); // Subtract days in UTC

    const formattedDate = pastDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC", // Force UTC to avoid shifting based on local time zone
    });

    days.push(formattedDate);
  }

  return days;
};

export const getLogsJoinedInLast30Days = (logs) => {
  const now = new Date(); // Get current date & time
  const today = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  ); // Normalize to start of today in UTC

  const last30Days = Array(30).fill(0); // Initialize an array of 30 zeros

  logs.forEach((log) => {
    const firstSeenDate = new Date(log.timestamp); // Convert firstseen to Date object (UTC)

    // Ensure firstSeenDate is compared in UTC
    const firstSeenUTC = new Date(
      Date.UTC(
        firstSeenDate.getUTCFullYear(),
        firstSeenDate.getUTCMonth(),
        firstSeenDate.getUTCDate()
      )
    );

    const diffInDays = Math.floor(
      (today - firstSeenUTC) / (1000 * 60 * 60 * 24)
    ); // Difference in full days

    if (diffInDays >= 0 && diffInDays < 30) {
      last30Days[29 - diffInDays]++; // Increment the count for the correct day
    }
  });

  return last30Days; // Array of user counts per day for the last 30 days
};

export const calculateTrend = (data) => {
  if (!data || data.length < 2) {
    return "neutral"; // Default to neutral if there's not enough data
  }

  const lastDayValue = data[data.length - 1]; // Most recent day's value
  const previousDayValue = data[data.length - 2]; // Day before that

  if (lastDayValue > previousDayValue) {
    return "up";
  } else if (lastDayValue < previousDayValue) {
    return "down";
  } else {
    return "neutral";
  }
};
