// // crete w/ mongoose

// const mongoose = require("mongoose");
// // switching to validtor.js for Ip validation---
// // const validator = require("validator");

// const deviceSchema = new mongoose.Schema(
//   {
//     // properties
//     deviceName: {
//       type: String,
//       required: true,
//     },
//     make: {
//       type: String,
//       required: false,
//     },

//     model: {
//       type: String,
//       required: false,
//     },

//     ip: {
//       type: String,
//       required: true,
//       unique: true,
//       /** old code ---
//      *   // ip validation - regex
//     // this will validate the strucute for an IPv4=1x.1x.1x.x
//     //but looking into validator.js libary for stricter IP validatoin ---
//     // match: /^(\d{1,3}\.){3}\d{1,3}$/,
//     */
//       // // w/Validator.js

//       // validate: {
//       //   validator: (v) => this.validate.isIP(v, 4),
//       //   message: (props) =>
//       //     `${props.value} is not a valid IPv4 address -- try again or check your IP address`,
//       // },
//       //  w/ UI bakery regex!
//       match: [
//         /^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
//         "IP address not valid -- try again",
//       ],
//     },
//     mac: {
//       type: String,
//       required: true,
//       /** REgex Docs
//        * https://www.geeksforgeeks.org/dsa/how-to-validate-mac-address-using-regular-expression/
//        *
//        * UIBakery:https://uibakery.io/regex-library/mac-address
//        */
//       match: /^(?:[0-9A-Fa-f]{2}[:-]){5}(?:[0-9A-Fa-f]{2})$/,
//     },
//     firmwareVersion: {
//       type: String,
//     },
//     serialNum: {
//       type: String,
//     },
//     location: {
//       type: String,
//     },
//     room: {
//       type: String,
//     },
//     group: {
//       type: String,
//     },
//     notes: {
//       type: String,
//     },
//     // schedules props --------
//     status: {
//       type: String,
//       enum: ["Online", "Offline", "Maintenance", "Unknown"],
//       default: "Unknown",
//     },
//     schedule: {
//       type: String,
//       enum: ["Weekly", "Monthly", "Quarterly", "Yearly", "Custom"],
//       default: "Quarterly",
//     },
//     lastChecked: {
//       // track date ----
//       type: Date,
//       default: Date.now,
//     },
//     // NEW: Maintenance Reminder Fields--> or Custom Schedule
//     reminderDate: {
//       type: String,
//       default: null,
//     },
//     reminderSent: {
//       type: Boolean,
//       default: false, //track notif. sent or X
//     },
//   },
//   { timestamps: true }
// );

// // export module

// module.exports = mongoose.model("Device", deviceSchema);

// crete w/ mongoose
// 11.19: New udpate: added FB UserID -> more secure and users access only their own devices per scan

// 🔥Updated/Revised: 5.21.2026

const mongoose = require("mongoose");

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
      // unique: true, -- skip for now/ uniquye Per USer now ----

      //  w/ UI bakery regex!
      match: [
        /^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
        "IP address not valid -- try again",
      ],
    },
    mac: {
      type: String,
      required: true,

      match: /^(?:[0-9A-Fa-f]{2}[:-]){5}(?:[0-9A-Fa-f]{2})$/,
    },

    // 🔥NMAP / scanner metadata ----

    hostname: {
      type: String,
    },

    osGuess: {
      type: String,
    },

    deviceTypeGuess: {
      type: String,
    },

    openPorts: [
      {
        port: { type: Number },
        protocol: { type: String },
        service: { type: String },
      },
    ],

    scanMethod: {
      type: String,
    },

    lastScanAt: {
      type: Date,
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
    schedule: {
      type: String,
      enum: ["Weekly", "Monthly", "Quarterly", "Yearly", "Custom"],
      default: "Quarterly",
    },
    lastChecked: {
      // track date ----
      type: Date,
      default: Date.now,
    },
    // NEW: Maintenance Reminder Fields--> or Custom Schedule
    reminderDate: {
      type: String,
      default: null,
    },
    reminderSent: {
      type: Boolean,
      default: false, //track notif. sent or X
    },
    // NEW: userID ----
    userId: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);
// cmpnd index --- user+ip
deviceSchema.index({ ip: 1, userId: 1 }, { unique: true });

// export module

module.exports = mongoose.model("Device", deviceSchema);

/**Compund Indexes
 * helps treat both values as unique pair ---- NOW! Users can scan their devices and save e/a IP  to the DB even IF the same -BUT avoids duplcaites w/in their own scans -
 */
