// /**
//  * created this UTil b/c i wanted to rename the old devices previously scanned to they could all have a default / fallback name
//  * Unnamed Device: X
//  * that way the Beta Version is able to render close to what it would really be
//  * it's still real data - just adding dynmaic names for BEta VErsion for easier management and tracking / reference of devices throughout app
//  */

// // imports ----

// // import { configDotenv } from "dotenv";
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const Device = require("../models/Device");

// // load MOMGO_URI @.env
// dotenv.config();

// // defien FX ------
// /** lookf through Devices [] -- all devices
//  * Look and find the ones that have empty value of device.name = ""/null/ doesn't exist OR old default --> "Unknown Device"
//  * $or:[] -- cool operator! Didn;t know! --> retuns any doc/value that matches at anyof the given arguentns / conditions
//  * https://www.mongodb.com/docs/manual/reference/operator/query/or/
//  * similar to $exist --> jsut checks if filed even exists or falls into the arguments/conditions to match
//  * https://www.mongodb.com/docs/manual/reference/operator/query/exists/
//  *
//  */
// async function renameOldDevices() {
//   // conndt to DB
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     // log- bugs
//     console.log("Yes! Connected to Database ... let's gooo!");

//     // simimlar to scan edit --> look for devices that are missing names (?)
//     const unnamedDevices = await Device.find({
//       $or: [
//         { deviceName: { $exists: false } },
//         { deviceName: "" },
//         { deviceName: null },
//         { deviceName: "Unknown Device" },
//         // curernt value --- let's tryu again
//         { deviceName: "?" },
//       ],
//     });

//     // fallabck IF NO unmamed devs come back - which is GREAT!
//     if (unnamedDevices.length === 0) {
//       // log
//       console.log("Great! NO Unnamed Devices Found - we're good!😎");
//       //   dosconenct form DB - no  more edits needede
//       await mongoose.disconnect();
//       // restun results ---
//       return;
//     }
//     // NOW ---> RETURN WHEN THERE ARE DEvices FOUND
//     // log-
//     console.log(
//       `Found ${unnamedDevices.length} unnamed devices... but it's okay!`
//     );
//     // actaul logic to rename the Unknow dEvices---
//     // Loop through the new unnamedDevices[]--- simialr to the scan edits ----
//     for (let i = 0; i < unnamedDevices.length; i++) {
//       // const to hold new Name value
//       const newName = `Unnamed Device: ${i + 1}`;
//       //   going through [] and applyign new name to [unnamedDevices]
//       unnamedDevices[i].deviceName = newName;
//       // push new name to DB and save ----
//       await unnamedDevices[i].save();
//       //log res
//       console.log(`Great! Making progress - Renamed to: "${newName}"`);
//     }

//     // log progress + disconensct form DB w/ chanegs + already saved ^^^ from prev.save()
//     console.log(
//       "😎✅ Let's Gooo! All unnaned devices were updated Succesfully!"
//     );
//     // disconnedt form DB
//     await mongoose.disconnect();
//   } catch (error) {
//     // gracefully fail / catch errors
//     // alwsy log ----
//     console.log("😤❌ Error -- could NOT rename devices", error.message);
//     // “Something went wrong — stop the script right now and mark this run as failed.” -- just
//     process.exit(1);
//   }
// }
// // Let's RUN THE SCRIPT -----🏃‍♀️🏃‍♀️🏃‍♀️‍➡️🏃‍♀️🏃‍♀️‍➡️🏃
// renameOldDevices();

// /** differnet MonogoDB operators
//  * https://www.mongodb.com/docs/manual/reference/mql/query-predicates/
//  * process.exit(1)
//  * https://nodejs.org/api/process.html#processexitcode
//  */
