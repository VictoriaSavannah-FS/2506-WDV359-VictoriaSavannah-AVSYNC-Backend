// crete w/ mongoose
// 11.19: New udpate: added FB UserID -> more secure and users access only their own devices per scan

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
    // MEW: userID ----
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
 * reference: https://www.geeksforgeeks.org/mongodb/mongodb-compound-indexes/
 * https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/#:~:text=Compound%20indexes%20collect%20and%20sort,index%2C%20use%20the%20following%20prototype:
 * { item: 1, location: 1 } MongoDB can use the compound index to support queries on these field combinations:
 *
 * deviceSchema.index({ ip: 1, userId: 1 }, { unique: true }); --
 * ip:1 - orders this vakeu in ascending order ++
 * userId - also orders in ascending order
 * BUT~ for uniqueness won't matter --> jsut helps treat both values as unique pair ---- NOW! Users can scan their devices and save e/a IP  to the DB even IF the same -BUT avoids duplcaites w/in their own scans -
 */
