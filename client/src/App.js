import React, { useEffect, useState } from "react";

// Services
import ProfileService from "./services/ProfileService";

// Styling
import AppStyles from "./App.module.scss";

function App() {
  const [newUserData, setNewUserData] = useState({
    name: "",
    license_num: "",
  });
  const [editingUserId, setEditingUserId] = useState(null);
  const [data, setData] = useState([]);

  const getProfiles = async () => {
    const profiles = await ProfileService.getProfiles();
    console.log("profiles", profiles);

    setData(profiles);
  };

  const handleUpdateUser = async () => {
    try {
      console.log("newUserData", newUserData);
      // Call your update function here
      await ProfileService.updateData(newUserData); // Adjust this as needed
      // Refresh data after update
      const updatedProfiles = await ProfileService.getProfiles();
      setData(updatedProfiles);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
    setEditingUserId(null); // Close the input after updating
  };

  const handleEditClick = (user) => {
    console.log("user", user);

    setEditingUserId(user._id); // Set the user ID of the user being edited
    setNewUserData({
      id: user._id,
      name: user.name,
      license_number: user.license_number,
    }); // Pre-fill the input fields
  };

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <div className={AppStyles["container"]}>
      <span className={AppStyles["title"]}>List of Drivers</span>
      {data &&
        data.map((user, i) => {
          const isEditing = editingUserId === user._id; // Check if this user is being edited

          return (
            <div className={AppStyles["card"]} key={i}>
              <span onClick={() => handleEditClick(user)}>
                <strong>Name: </strong>

                {isEditing ? (
                  <input
                    className={AppStyles["input"]}
                    type="text"
                    value={newUserData.name}
                    onChange={(e) =>
                      setNewUserData({ ...newUserData, name: e.target.value })
                    }
                  />
                ) : (
                  user.name
                )}
              </span>
              <span onClick={() => handleEditClick(user)}>
                <strong>License: </strong>
                {isEditing ? (
                  <input
                    className={AppStyles["input"]}
                    type="text"
                    value={newUserData.license_number}
                    onChange={(e) =>
                      setNewUserData({
                        ...newUserData,
                        license_number: e.target.value,
                      })
                    }
                  />
                ) : (
                  user.license_number
                )}
              </span>
              {isEditing && <button onClick={handleUpdateUser}>Update</button>}
            </div>
          );
        })}
    </div>
  );
}

export default App;
