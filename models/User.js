// crete w/ mongoose

const mongoose = require("mongoose");
const { islowercase } = require("validator");

const userSchema = new mongoose.Schema({
  // properties
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // need to add some sort of auth----
    unique: true,
    lowercase: true,
    trim: true, //gets rid of spaces --
    match: [
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
      "Please enter a valid email address.",
    ],
    // love this source!https://uibakery.io/regex-library/email
    // this long allows: allow part after @ to be IP address.
  },

  //   need an authenticator to store users/passwords - hassh later---

  password: {
    type: String,
    required: true,
    minlength: 7,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ["Admin", "Tech"],
    default: "Tech", //unless assigned Admin
  },

  //   if they forget/need to reset password
  isVerified: {
    type: Boolean,
    // OAuth automatically verifies - so will mayke this dynamic based on res.
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

// export module

module.exports = mongoose.model("User", userSchema);
