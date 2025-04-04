export const saveUserToLocalStorage = (signedInUser) => {
  console.log(`in saveUserToLocalStorage`);
  console.log(signedInUser);
  localStorage.setItem("signedInUser", JSON.stringify(signedInUser)); // Save user data to localStorage
};
export const getUserFromLocalStorage = () => {
  console.log(`in getUserFromLocalStorage`);
  const signedinUser = localStorage.getItem("signedInUser"); // Get user data from localStorage
  if (signedinUser) {
    try {
      const userObject = JSON.parse(signedinUser); // Convert JSON string to object
      console.log(userObject);
      return userObject;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null; // Return null if parsing fails
    }
  }
  return null; // Return null if no user is found
};

export const saveAppIdLocalStorage = (currApp) => {
  console.log(`in saveAppIdLocalStorage`);
  console.log(currApp);
  localStorage.setItem("currApp", JSON.stringify(currApp)); // Save user data to localStorage
};
export const getAppIdFromLocalStorage = () => {
  console.log(`in getAppIdFromLocalStorage`);
  const currApp = localStorage.getItem("currApp"); // Get user data from localStorage
  if (currApp) {
    try {
      const appId = JSON.parse(currApp); // Convert JSON string to object
      console.log(appId);
      return appId;
    } catch (error) {
      console.error("Error parsing appId data:", error);
      return null; // Return null if parsing fails
    }
  }
  return null; // Return null if no user is found
};
