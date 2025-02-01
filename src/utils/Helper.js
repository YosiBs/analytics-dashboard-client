import axios from "axios";
import * as usersService from "../services/usersService";
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

export function getLast3MonthsDailyLogins2(dailyLoginlogs) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const twoMonthsAgo = lastMonth === 0 ? 11 : lastMonth - 1;
  const currentYear = now.getFullYear();
  const lastMonthYear = lastMonth === 11 ? currentYear - 1 : currentYear;
  const twoMonthsAgoYear = twoMonthsAgo === 11 ? currentYear - 1 : currentYear;

  // Helper function to get the correct number of days
  function getDaysArray(month, year) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }

  // Get days array based on the **current month**
  const days = getDaysArray(currentMonth, currentYear);

  // Helper function to group logs by day (ensuring the array length matches)
  function groupByDay(month, year) {
    const daysCount = days.length; // Ensure data matches days array length
    const grouped = new Array(daysCount).fill(0);

    dailyLoginlogs.forEach((log) => {
      const logDate = new Date(log.timestamp);
      if (logDate.getMonth() === month && logDate.getFullYear() === year) {
        const day = logDate.getDate() - 1; // Adjust for 0-based index
        if (day < daysCount) {
          grouped[day] += 1; // Count logins for that day
        }
      }
    });

    return grouped;
  }

  // Get data for each of the last 3 months
  const month1Data = groupByDay(currentMonth, currentYear);
  const month2Data = groupByDay(lastMonth, lastMonthYear);
  const month3Data = groupByDay(twoMonthsAgo, twoMonthsAgoYear);

  return { month1Data, month2Data, month3Data, days };
}

export function countInactiveUsers(users, days) {
  if (!Array.isArray(users) || users.length === 0) return 0;

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
      return false;
    }

    // Normalize lastSeenDate to remove time
    lastSeenDate.setHours(0, 0, 0, 0);

    return lastSeenDate < thresholdDate;
  }).length;
}

export function debugLog(message, data = null) {
  const stack = new Error().stack.split("\n")[2].trim(); // Get caller info
  console.log(`[${stack}] ${message}`, data);
}

export async function processRatingsData(appId) {
  try {
    const ratings = await usersService.getRatingsByAppId(appId);

    if (!Array.isArray(ratings) || ratings.length === 0) {
      return {
        averageRating: 0,
        totalRaters: 0,
        ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        ratings: [],
      };
    }

    // Process ratings
    const totalRaters = ratings.length;
    const sumRatings = ratings.reduce((acc, { rating }) => acc + rating, 0);
    const averageRating =
      totalRaters > 0 ? (sumRatings / totalRaters).toFixed(1) : 0;

    // Generate rating breakdown
    const ratingBreakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    ratings.forEach(({ rating }) => {
      if (rating >= 1 && rating <= 5) {
        ratingBreakdown[rating] += 1;
      }
    });

    // Convert count to percentage
    Object.keys(ratingBreakdown).forEach((key) => {
      ratingBreakdown[key] =
        totalRaters > 0
          ? ((ratingBreakdown[key] / totalRaters) * 100).toFixed(1)
          : 0;
    });

    return {
      averageRating,
      totalRaters,
      ratingBreakdown,
      ratings, // Return raw ratings if needed (for comments, timestamps, etc.)
    };
  } catch (error) {
    console.error("Error processing ratings:", error);
    return {
      averageRating: 0,
      totalRaters: 0,
      ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      ratings: [],
    };
  }
}

export function getLast7Months() {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentMonth = new Date().getMonth(); // 0-based index (0 = Jan, 11 = Dec)
  const last7Months = [];

  for (let i = 6; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12; // Handle wrap-around for previous year
    last7Months.push(monthNames[monthIndex]);
  }

  return last7Months;
}

export async function getLast7MonthsLogCounts(appId, logType, description) {
  const months = getLast7Months(); // Get last 7 months as ["Jan", "Feb", ...]
  const currentYear = new Date().getFullYear();

  // Convert month names to numbers (1-12)
  const monthNumbers = months.map((monthName) => {
    const date = new Date(Date.parse(monthName + " 1, " + currentYear));
    return date.getMonth() + 1; // Get 1-based month number
  });

  // Fetch logs for each month and count matching logs
  const logCounts = await Promise.all(
    monthNumbers.map(async (month) => {
      try {
        const logs = await usersService.getLogsByAppIdAndTypeAndMonth(
          appId,
          logType,
          month
        );

        console.log(`Logs for ${month}:`, logs);

        // Filter logs where logType matches and description matches
        const filteredLogs = logs.filter(
          (log) => log.logtype === logType && log.description === description
        );

        return filteredLogs.length; // Return count of matching logs
      } catch (error) {
        console.error(`Error fetching logs for month ${month}:`, error);
        return 0; // Return 0 if there's an error
      }
    })
  );

  return logCounts; // Returns an array of 7 numbers
}
