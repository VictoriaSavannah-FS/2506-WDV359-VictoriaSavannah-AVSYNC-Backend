// scan.js -- implenting axios to fetch data --
/** Scan local network devces + and send to MaongoDb
 * use axios for HTTP reqs/
 * async/await function - streamline process
 */

// axios - HTTP reqs
const axios = require("axios");
// STILL USE Local-device to scan local netwrk for devices ---
const find = require("local-devices");

// async functin to sue await - wait for res.
async function scannerAndSaveDevs() {
  //scan local-devices ---
  const devices = await find();
  // /track -- bug Log ---
  console.log(`Found ${devices.length} device(s) ...\n`);

  // new! HOld # of unnamed devices -- I still want to be able to assign or know which device is which

  let unnamedCount = 0;

  // for loop - go throaugh e/a device [] @ a time
  for (const [i, device] of devices.entries()) {
    // THIS will the logic for fallback names for devices that are unammed (for NOW / Beta Ver.) _ assigning dynamic # to e/a to keep track of
    let deviceName;
    // if noDEvice name || "" => ad to counter ---
    if (!device.name || device.name.trim() === "") {
      // add to coutner val
      unnamedCount++;
      deviceName = `Unnamed Device: ${unnamedCount}`;
    } else {
      // IF device has name -> use that value = device.name as name
      deviceName = device.name;
    }

    // Data to be Send ----props/params --
    // pyload=hold props.
    const payload = {
      // name/ip/mac --- deviceDeats...W/ || fallbcks----
      // deviceName: device.name || "Unknown Device",
      deviceName,
      ip: device.ip,
      mac: device.mac || "00:00:00:00:00:00",

      // awesome worked-- so adding the rest of my params/props
      make: device.make || "Make Unknown",
      model: device.model || "Model Unknown",
      firmwareVersion: device.firmwareVersion || "Firmware Version Unknown",
      serialNum: device.serialNum || "Serial # Unknown",
      location: "",
      room: "",
      group: "",
      notes: "",
      status: "Unknown",
    };

    // log/track ^^^ prev. Params --
    console.log(
      // params from thee forLoop {props:ip/mac/dName..}
      `${i + 1}. Sending: ${payload.ip} - ${payload.mac} - ${
        payload.deviceName
      }`
    );
    // send device dato - t backend w/ axios --
    // trycatch / cath errors/falbacks
    try {
      // axios reqs..@api.ednpoint
      const res = await axios.post(
        "http://localhost:3001/api/v1/devices",
        payload
      );
      // log console --- show res + IF saved @db
      console.log(`Yess! ✅😎 Saved to DB: ${res.data.device.deviceName}`);
    } catch (err) {
      console.error(
        `NOO! ❌🥺 Failed to save ${payload.ip}:`,
        err.response?.data || err.message
      );
    }
  }
}
// RUN LE FUNCTIONNE 😎 -----
scannerAndSaveDevs();

// // scan.js -- Save scanned devices directly to MongoDB Atlas (bypassing API)
// /** Scan local network devices + save to MongoDB directly for Beta version */

// require("dotenv").config();
// const mongoose = require("mongoose");
// const find = require("local-devices");
// const Device = require("./models/Device"); // make sure path is correct!

// // --- Connect directly to Atlas ---
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ Connected to MongoDB Atlas for scanning"))
//   .catch((err) => {
//     console.error("❌ Could not connect to MongoDB Atlas", err);
//     process.exit(1);
//   });

// async function scannerAndSaveDevs() {
//   console.log("🔍 Scanning local network...");
//   const devices = await find();
//   console.log(`Found ${devices.length} device(s) ...\n`);

//   let unnamedCount = 0;

//   for (const [i, device] of devices.entries()) {
//     let deviceName;
//     if (!device.name || device.name.trim() === "") {
//       unnamedCount++;
//       deviceName = `Unnamed Device: ${unnamedCount}`;
//     } else {
//       deviceName = device.name;
//     }

//     const payload = {
//       deviceName,
//       ip: device.ip,
//       mac: device.mac || "00:00:00:00:00:00",
//       make: device.make || "Make Unknown",
//       model: device.model || "Model Unknown",
//       firmwareVersion: device.firmwareVersion || "Firmware Version Unknown",
//       serialNum: device.serialNum || "Serial # Unknown",
//       location: "",
//       room: "",
//       group: "",
//       notes: "",
//       status: "Unknown",
//     };

//     try {
//       const existing = await Device.findOne({ ip: payload.ip });
//       if (existing) {
//         console.log(`⚠️ Skipping duplicate IP: ${payload.ip}`);
//         continue;
//       }

//       const newDevice = new Device(payload);
//       await newDevice.save();
//       console.log(`✅ Saved to DB: ${payload.deviceName} (${payload.ip})`);
//     } catch (err) {
//       console.error(`❌ Failed to save ${payload.ip}:`, err.message);
//     }
//   }

//   console.log("🎉 Scan complete! Disconnecting...");
//   mongoose.disconnect();
// }

// scannerAndSaveDevs();
