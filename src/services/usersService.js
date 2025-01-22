import axios from "axios";
import * as localStorageHelper from "../utils/localStorageHelper";
export const getUsersByAppId = async (appId) => {
  console.log(`Fetching users for App ID: ${appId}`);

  const url = `http://localhost:5000/api/users/GetAllAppUsersByAppID/${appId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
      },
    });

    console.log("Users fetched successfully:", response.data);
    return response.data; // Return the fetched data
  } catch (error) {
    if (error.response) {
      // Server responded with a status code outside 2xx range
      console.error("Error response:", error.response.data);
    } else if (error.request) {
      // No response received
      console.error("Error request:", error.request);
    } else {
      // Axios setup issue
      console.error("Error message:", error.message);
    }
    throw error; // Rethrow the error for the caller to handle
  }
};

export const getLogsByAppIdAndType = async (appId, logType) => {
  console.log(`Fetching users for App ID: ${appId}`);

  const url = `http://localhost:5000/api/logs/applications/${appId}/logType/${logType}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
      },
    });

    console.log("Users fetched successfully:", response.data);
    return response.data; // Return the fetched data
  } catch (error) {
    if (error.response) {
      // Server responded with a status code outside 2xx range
      console.error("Error response:", error.response.data);
    } else if (error.request) {
      // No response received
      console.error("Error request:", error.request);
    } else {
      // Axios setup issue
      console.error("Error message:", error.message);
    }
    throw error; // Rethrow the error for the caller to handle
  }
};

export const getAllLogsByAppId = async (appId) => {
  console.log(`Fetching all logs for App ID: ${appId}`);

  const url = `http://localhost:5000/api/logs/applications/${appId}`;

  try {
    const response = await axios.get(url, {
      headers: { Accept: "application/json" },
    });

    console.log("Logs fetched successfully:", response.data);
    return response.data; // Return fetched logs
  } catch (error) {
    console.error("Error fetching logs:", error);
    throw error;
  }
};

export const getApplicationsByDeveloper = async () => {
  // Retrieve developer info from localStorage
  const developer = localStorageHelper.getUserFromLocalStorage();

  if (!developer || !developer.email) {
    console.error("No developer email found in local storage.");
    return [];
  }

  const developerId = developer.email; // Use email as developerId
  console.log(`Fetching applications for Developer ID: ${developerId}`);

  const url = `http://localhost:5000/api/developers/${developerId}/applications`;

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
      },
    });

    console.log("Applications fetched successfully:", response.data);
    return response.data; // Return the fetched applications
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    throw error; // Rethrow the error for handling in the calling function
  }
};

export const addNewApplication = async (appData) => {
  console.log(`Adding new application:`, appData);

  const url = `http://localhost:5000/api/applications`;

  try {
    const response = await axios.post(url, appData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    console.log("Application added successfully:", response.data);
    return response.data; // Return the response data
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};
