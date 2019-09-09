const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
}

// Define API routes
app.use(routes);

// Connect to MongoDB Database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/googlebooks";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log(`API Server listening on port: ${PORT}`)
});