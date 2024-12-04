import axios from "axios";

/*POST New User*/
export const createUser = async (data) => {
  console.log(`Current Data~~`);
  console.log(data);

  const url = "http://localhost:5000/api/developers/";

  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    console.log("Developer created successfully:", response.data);
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
  }
};

/* GET User By Email */
/*
export const fetchData = async (currentEmail) => {
  try {
    const response = await axios.get(
      `${constants.BASE_URL}/superapp/users/login/${constants.SUPERAPP_NAME}/${currentEmail}`
      );
      return response;
    } catch (error) {
      console.error("Error making GET request:", error);
      throw error;
    }
  };
  
  */

/* PUT Update User */
/*
export const putUser = async (currentUser) => {
  try {
    const response = await axios.put(
      `${constants.BASE_URL}/superapp/users/${currentUser.userId.superapp}/${currentUser.userId.email}`,
      currentUser
      );
      
      return response.data;
    } catch (error) {
      console.error("Error making PUT request:", error);
      throw error;
    }
  };
  
  */
