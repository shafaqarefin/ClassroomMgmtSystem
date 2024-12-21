const Post = require("../models/postSchema");
const { getUserFromToken } = require("../services/authentication");
const createPost = async (req, res) => {
  const { blogContent } = req.body;
  if (!blogContent) {
    res.status(400).json({ message: "field missing" });
  }
  try {
    await Post.create({
      content: blogContent,
      author: getUserFromToken(req.cookies.sessionId).id,
    });

    res.status(200).json({ message: "Successfully Posted" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getPostbyUserId = async (req, res) => {
  const userId = getUserFromToken(req.cookies.sessionId).id;
  if (!userId) {
    res.status(400).json({ message: "User Id Not Provided" });
  }
  try {
    const postArray = await Post.find({ _id: userId });
    res.status(200).json({ postArray: postArray });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = { createPost, getPostbyUserId };
