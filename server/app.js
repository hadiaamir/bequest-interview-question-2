const express = require("express");

const ProfileCollection = require('./data/Profiles');
const PORT = 8080;
const app = express();


app.use(express.json());



const cors = require('cors');
const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
	optionSuccessStatus: 200
}
app.use(cors(corsOptions));



app.use(express.json());

// Routes
app.get("/api/profiles", (req, res) => {

	return res.status(200).json({ data: ProfileCollection });

});



app.post("/api/profiles/update", (req, res) => {
	const { id, name, license_number } = req.body;

	console.log(id, name, license_number)



	// Find the user by ID
	const userIndex = ProfileCollection.findIndex(user => user._id === id);

	console.log('userIndex', userIndex)

	if (userIndex !== -1) {
		// Update user details
		ProfileCollection[userIndex].name = name;
		ProfileCollection[userIndex].license_number = license_number;

		// Send a success response
		return res.status(200).json({ message: "Profile updated successfully", user: ProfileCollection[userIndex] });
	} else {
		// User not found
		return res.status(404).json({ message: "User not found" });
	}
});

app.listen(PORT, () => {
	console.log("Server running on port " + PORT);
});


