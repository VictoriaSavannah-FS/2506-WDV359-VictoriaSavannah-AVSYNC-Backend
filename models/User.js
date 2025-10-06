// crete w/ mongoose

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // properties
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  //   need an authenticator to store users/passwords

  //   password: {
  //     type: String,
  //     required: true,
  //   },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// export module

module.exports = mongoose.model("User", userSchema);
