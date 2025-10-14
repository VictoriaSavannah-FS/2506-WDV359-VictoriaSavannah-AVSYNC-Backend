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

  // for loop - go throaugh e/a device [] @ a time
  for (const [i, device] of devices.entries()) {
    // Data to be Send ----props/params --
    // pyload=hold props.
    const payload = {
      // name/ip/mac --- deviceDeats...W/ || fallbcks----
      deviceName: device.name || "Unknown Device",
      ip: device.ip,
      mac: device.mac || "00:00:00:00:00:00",

      // awesome worked-- so adding the rest of my params/props
      make: device.make || "Make Unknown",
      model: device.model || "Model Unknown",
      firmwareVersion: device.firmwareVersion || "Unknown",
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
