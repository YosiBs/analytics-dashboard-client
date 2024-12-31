import axios from "axios";

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
