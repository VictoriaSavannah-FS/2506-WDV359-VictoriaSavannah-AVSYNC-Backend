/** Device Routes
 * GEt /devices - list ALL devices
 * POST /devices - Add new device
 * PUT /devices/:id - Update selected [id] device
 * DELETE/devices/:id - remve [id] device
 * ---------
 *  - 200: OK
 * - 201: Created
 * - 400: Client error
 * - 404: Not Found
 * - 500: Server error
 */

// /**
//  * Sources:
//  * - https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
//  * - https://mongoosejs.com/docs/models.html
//  */
const express = require("express");
const Device = require("../models/Device");
const router = express.Router();

/**
 * GET /devices - List ALL devicesc --------------
 */
// router.get("/", async (req, res) => {
//   // trycatch --- for all routes
//   // Status codes - for all routes ----
//   try {
//     const devices = await Device.find(); // Get all from DB
//     // stats =OK - res=devices
//     res.status(200).json(devices);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Failed to fetch devices", details: error.message });
//   }
// });
router.get("/", async (req, res) => {
  console.log("🛰  GET /devices request received"); // ✅ added log

  try {
    const devices = await Device.find(); // Get all from DB
    console.log("📦 Found devices:", devices.length); // ✅ added log
    res.status(200).json(devices);
  } catch (error) {
    console.error("❌ Error fetching devices:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch devices", details: error.message });
  }
});

/**
 * POST /devices - Add new device --------------
 */
router.post("/", async (req, res) => {
  console.log("Received POST /devices", req.body?.ip);
  try {
    // trycatch --- for all routes
    // Status codes - for all routes ----
    // Build device from request
    const newDevice = new Device(req.body);
    const savedDevice = await newDevice.save(); // Save @DB
    res.status(201).json({ message: "Device saved ✅😎", device: savedDevice });
  } catch (error) {
    console.error("Error saving device: ❌🥺", error);
    res
      .status(400)
      .json({ error: "Failed to save device ‼️❌", details: error.message });
  }
});

/**
 * PUT /devices/:id - Update SELCTD [id] device --------------
 */
router.put("/:id", async (req, res) => {
  // / trycatch --- for all routes
  // Status codes - for all routes ----
  try {
    // upadte by ID ---
    const updatedDevice = await Device.findByIdAndUpdate(
      //raget params --- Id + tagert props w/in body---
      req.params.id,
      req.body,
      {
        // return THEE NEW version ----
        new: true,
        // apply validaotrs from schema @ new Versions
        runValidators: true,
      }
    );
    // logic -- NOT upadte -> send res.stat+mssg
    if (!updatedDevice) {
      return res.status(404).json({ error: "Device not found❌" });
    }
    // ELSE ---- sucess! 200 OK -----
    res
      .status(200)
      .json({ message: "Device updated ✅😁", device: updatedDevice });
  } catch (error) {
    // error catch all else ---
    res
      .status(400)
      .json({ error: "Failed to update device❌🥺", details: error.message });
  }
});

/**
 * DELETE /devices/:id - Remove [id] device --------------
 * trycatch --- for all routes
 * Status codes - for all routes ----
 */
router.delete("/:id", async (req, res) => {
  try {
    // dlte based@ID ----
    const deletedDevice = await Device.findByIdAndDelete(req.params.id);
    //logic -- NOT upadte -> send res.stat+mssg
    if (!deletedDevice) {
      return res.status(404).json({ error: "Device not found" });
    }
    // ELSE ---- sucess! 200 OK -----
    res
      .status(200)
      .json({ message: "Device deleted ✅", device: deletedDevice });
  } catch (error) {
    // error catch all else ---
    res
      .status(500)
      .json({ error: "Failed to delete device", details: error.message });
  }
});

module.exports = router;
