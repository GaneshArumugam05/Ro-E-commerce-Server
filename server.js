// Server.js
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose")
const connectDB = require("./config/db");

// Middleware -------------------------------------------------------------------------------------------- /
app.use(cors());
app.use(express.json());

// Database Connect -------------------------------------------------------------------------------------- /
connectDB();

// Routes ------------------------------------------------------------------------------------------------ /
app.use("/api/products", require("./routes/products"));

// Server Listen ----------------------------------------------------------------------------------------- /
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`),
);
