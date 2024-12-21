const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("node:crypto");
const {
  getUserFromToken,
  setTokenForUser,
} = require("../services/authentication.js");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/default.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;

  // Check if the password field is modified
  if (!user.isModified("password")) {
    return next(); // Proceed to the next middleware
  }

  // Generate a secure salt
  const salt = randomBytes(16).toString("hex");

  // Hash the password using HMAC with the salt
  const hashedPass = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  // Save the salt and hashed password
  user.salt = salt;
  user.password = hashedPass;

  next();
});

userSchema.static(
  "matchPasswordandGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) {
      throw new console.log("User not found!");
    }
    const salt = user.salt;
    const hashedPassword = user.password;
    const userProvidedHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    if (hashedPassword !== userProvidedHash) {
      throw new Error("Incorrect Password");
    }
    const token = setTokenForUser(user);
    return token;
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
