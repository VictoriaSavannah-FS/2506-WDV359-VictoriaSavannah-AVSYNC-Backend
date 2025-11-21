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
 *
 * 11.19New udpate: wanted to isolate device DB per User -> the user only sees their respective devices on fetch @ frontend. Safer + only shows their devices absed on their FB-userID
 */

/**
 * Sources:
 * - https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 * - https://mongoosejs.com/docs/models.html
 */

const express = require("express");
const Device = require("../models/Device");
const router = express.Router();

/**
 * GET /devices - List ALL devices --------------
 * UPDATED: Now ONLY retrns--> devices belongs@ userId X
 * GET /devices?userId=SOME_UID
 */

router.get("/", async (req, res) => {
  // log----
  console.log("🛰 GET /devices request received ---- ");

  // per-user dec-----
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).json({
      error: "❌ Missing userId ‼️",
    });
  }

  try {
    // fetch only THIS users devices-----
    const devices = await Device.find({ userId });

    // log ---- res.
    console.log(`📦 Found ${devices.length} devices for user --- ${userId}`);

    res.status(200).json(devices);
  } catch (error) {
    console.error("❌ Error fetching devices:", error);
    res.status(500).json({
      error: "Failed to fetch devices",
      details: error.message,
    });
  }
});

/**
 * POST /devices - Add new device --------------
 * *** userId @ from frontend/scanner
 */

router.post("/", async (req, res) => {
  // log ---
  console.log("Received POST /devices", req.body?.ip);

  // return+ code+throw error if NO userId
  if (!req.body.userId) {
    return res
      .status(400)
      .json({ error: "userId is required for saving device ‼️" });
  }

  try {
    const newDevice = new Device(req.body);
    const savedDevice = await newDevice.save(); // Save @ DB

    // log res + code = success!!
    res.status(201).json({
      message: "Device saved ✅😎",
      device: savedDevice,
    });
  } catch (error) {
    console.error("Error saving device: ❌🥺", error);
    res.status(400).json({
      error: "Failed to save device ‼️❌",
      details: error.message,
    });
  }
});

/**
 * PUT /devices/:id - Update SELCTD [id] device --------------
 * ONLY updates device IF device belongs to --> userX
 */

router.put("/:id", async (req, res) => {
  // code + res? no userID----
  if (!req.body.userId) {
    return res.status(400).json({
      error: "userId required in request body for update!",
    });
  }

  try {
    // MAKE SURE device belongs to this user
    const updatedDevice = await Device.findOneAndUpdate(
      { _id: req.params.id, userId: req.body.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedDevice) {
      return res.status(404).json({
        error: "Device not found❌ or does NOT belong to this user",
      });
    }

    res.status(200).json({
      message: "Device updated ✅😁",
      device: updatedDevice,
    });
  } catch (error) {
    res.status(400).json({
      error: "Failed to update device❌🥺",
      details: error.message,
    });
  }
});

/**
 * DELETE /devices/:id - Remove [id] device --------------
 * Only deletes device IF device belongs to that user
 */

router.delete("/:id", async (req, res) => {
  const userId = req.query.userId; // pass userId

  if (!userId) {
    return res.status(400).json({
      error: "userId required for delete operation",
    });
  }

  try {
    const deletedDevice = await Device.findOneAndDelete({
      _id: req.params.id,
      userId,
    });

    if (!deletedDevice) {
      return res.status(404).json({
        error: "Device not found OR does NOT belong to this user",
      });
    }

    res.status(200).json({
      message: "Device deleted ✅",
      device: deletedDevice,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete device",
      details: error.message,
    });
  }
});

module.exports = router;
