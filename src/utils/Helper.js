import axios from "axios";
//===========================================================================================
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
//===========================================================================================
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
//===========================================================================================
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
//===========================================================================================
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
//===========================================================================================
export const getLast3MonthsDailyLogins = (logs) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get start dates for each of the last 3 months
  const month1Start = new Date(today);
  month1Start.setMonth(today.getMonth() - 0, today.getDate());

  const month2Start = new Date(today);
  month2Start.setMonth(today.getMonth() - 1, today.getDate());

  const month3Start = new Date(today);
  month3Start.setMonth(today.getMonth() - 2, today.getDate());

  // Initialize arrays for each month (31 days max)
  const month1Data = Array(31).fill(0);
  const month2Data = Array(31).fill(0);
  const month3Data = Array(31).fill(0);
  const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`); // ["1", "2", ..., "31"]

  logs.forEach((log) => {
    if (log.logtype !== "DailyLogin") return;

    const logDate = new Date(log.timestamp);
    logDate.setHours(0, 0, 0, 0); // Normalize to the start of the day

    const dayIndex = logDate.getDate() - 1; // Get day index (0-based)

    if (logDate >= month1Start) {
      month1Data[dayIndex]++;
    } else if (logDate >= month2Start) {
      month2Data[dayIndex]++;
    } else if (logDate >= month3Start) {
      month3Data[dayIndex]++;
    }
  });

  return { month1Data, month2Data, month3Data, days };
};

export function countInactiveUsers(users, days) {
  if (!Array.isArray(users) || users.length === 0) return -1;

  const currentDate = new Date();
  const thresholdDate = new Date();
  thresholdDate.setDate(currentDate.getDate() - days);

  // Normalize thresholdDate to remove time
  thresholdDate.setHours(0, 0, 0, 0);

  return users.filter((user) => {
    if (!user.lastseen) return false; // Skip users with no lastSeen data

    const lastSeenDate = new Date(user.lastseen);

    // If lastSeenDate is invalid, log and skip
    if (isNaN(lastSeenDate)) {
      debugLog("Invalid lastSeen date:", user.lastseen);
      return false;
    }

    // Normalize lastSeenDate to remove time
    lastSeenDate.setHours(0, 0, 0, 0);

    debugLog("lastSeenDate", lastSeenDate);
    debugLog("thresholdDate", thresholdDate);

    return lastSeenDate < thresholdDate;
  }).length;
}

export function debugLog(message, data = null) {
  const stack = new Error().stack.split("\n")[2].trim(); // Get caller info
  console.log(`[${stack}] ${message}`, data);
}
