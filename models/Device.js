// crete w/ mongoose

const mongoose = require("mongoose");
// switching to validtor.js for Ip validation---
// const validator = require("validator");

const deviceSchema = new mongoose.Schema(
  {
    // properties
    deviceName: {
      type: String,
      required: true,
    },
    make: {
      type: String,
      required: false,
    },

    model: {
      type: String,
      required: false,
    },

    ip: {
      type: String,
      required: true,
      unique: true,
      /** old code --- 
     *   // ip validation - regex
    // this will validate the strucute for an IPv4=1x.1x.1x.x
    //but looking into validator.js libary for stricter IP validatoin ---
    // match: /^(\d{1,3}\.){3}\d{1,3}$/,
    */
      // // w/Validator.js

      // validate: {
      //   validator: (v) => this.validate.isIP(v, 4),
      //   message: (props) =>
      //     `${props.value} is not a valid IPv4 address -- try again or check your IP address`,
      // },
      //  w/ UI bakery regex!
      match: [
        /^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
        "IP address not valid -- try again",
      ],
    },
    mac: {
      type: String,
      required: true,
      /** REgex Docs
       * https://www.geeksforgeeks.org/dsa/how-to-validate-mac-address-using-regular-expression/
       *
       * UIBakery:https://uibakery.io/regex-library/mac-address
       */
      match: /^(?:[0-9A-Fa-f]{2}[:-]){5}(?:[0-9A-Fa-f]{2})$/,
    },
    firmwareVersion: {
      type: String,
    },
    serialNum: {
      type: String,
    },
    location: {
      type: String,
    },
    room: {
      type: String,
    },
    group: {
      type: String,
    },
    notes: {
      type: String,
    },
    // schedules props --------
    status: {
      type: String,
      enum: ["Online", "Offline", "Maintenance", "Unknown"],
      default: "Unknown",
    },
    lastChecked: {
      // track date ----
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// export module

module.exports = mongoose.model("Device", deviceSchema);
