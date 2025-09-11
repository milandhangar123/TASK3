const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const User = require("./models/User");

const dotenv = require('dotenv');
dotenv.config(); 

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});
const upload = multer({ storage });

app.use("/uploads", express.static("uploads"));


app.post("/api/form", upload.single("image"), async (req, res) => {
  try {
    const { firstName, email, contactNo, address } = req.body;
    const image = req.file ? req.file.filename : null;

    // Create new user document
    const user = new User({ firstName, email, contactNo, address, image });
    await user.save();

    res.json({ message: "User saved successfully!", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving user" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
