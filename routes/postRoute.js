const express = require("express");
const { createPost } = require("../controllers/postController");
const router = express.Router();

// Define routes
router.post("/", createPost);
router.get("/");
router.get("/:id?");

module.exports = router;
