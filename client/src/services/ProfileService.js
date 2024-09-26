import environment from "../utils/environment";
import http from '../utils/http'

const getProfiles = async () => {
  try {
    const response = await http.get(`${environment.resolveApi()}/api/profiles`);


    if (!response.data) {
      console.error(`Error fetching data: ${response.statusText}`);
    }

    const profiles = await response.data

    return profiles;
  } catch (error) {
    console.error("Failed to fetch profiles:", error);
  }
};

const updateData = async (data) => {
  try {



    const response = await http.post(`${environment.resolveApi()}/api/profiles/update`, data);


    if (!response) {
      console.error(`Error updating data: ${response.statusText}`);
    }

    return getProfiles(); // Return the profiles after updating
  } catch (error) {
    console.error("Failed to update profiles:", error);
  }
};

// Export an object that includes the functions
const ProfileService = {
  getProfiles,
  updateData,
};

export default ProfileService;
