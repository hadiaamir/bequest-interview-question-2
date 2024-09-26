const express = require("express");
const CryptoJS = require("crypto-js");
const ProfileCollection = require("./data/Profiles");
const PORT = 8080;
const app = express();

app.use(express.json());

const cors = require("cors");

const corsOptions = {
	origin: "http://localhost:3000",
	credentials: true,
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

// Routes
app.get("/api/profiles", (req, res) => {
	return res.status(200).json({ data: ProfileCollection });
});


// Update profile API
app.post("/api/profiles/update", (req, res) => {
	const { data, hash } = req.body;
	const calculatedHash = CryptoJS.SHA256(JSON.stringify(data)).toString();
	const { id, name, license_number } = data;

	// Check for data integrity using the hash
	if (calculatedHash !== hash) {
		return res.status(400).json({ message: "Data integrity check failed." });
	}

	// Input validation: Ensure id, name, and license_number are provided
	if (!id || !name || !license_number) {
		return res.status(400).json({ message: "All fields are required." });
	}

	// Find the user by ID
	const userIndex = ProfileCollection.findIndex((user) => user._id === id);


	if (userIndex !== -1) {
		// Update user details
		ProfileCollection[userIndex].name = name;
		ProfileCollection[userIndex].license_number = license_number;

		// Send a success response
		return res.status(200).json({
			message: "Profile updated successfully",
			user: ProfileCollection[userIndex],
		});
	} else {
		// User not found
		return res.status(404).json({ message: "User not found" });
	}
});


app.listen(PORT, () => {
	console.log("Server running on port " + PORT);
});
