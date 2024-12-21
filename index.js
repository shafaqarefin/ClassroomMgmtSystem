const express = require("express");
const path = require("path");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const { connectMongoDB } = require("./connection");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const app = express();
const PORT = 3000;

// Connection to MongoDB
connectMongoDB("mongodb://localhost:27017/Blogify")
  .then(() => console.log("MongoDB Database Connected...."))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

//Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/user", userRoute);
app.use("/post", postRoute);

// Server Listening
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}...`);
});
