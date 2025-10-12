/** Device Routes
 * GEt /devices - list ALL devices
 * POST /devices - Add new device
 * PUT /devices/:id - Update selected [id] device
 * DELETE/devices/:id - remve [id] device
 */

const express = require("express");
const router = express.Router();

// * GET /devices - list ALL devices
router.get("/", async (req, res) => {
  // try {
  //   // stat = OK
  //   res.status(200).json({ message: "Get all Devices in inventory " });
  // } catch (error) {
  //   // stat = server err 500
  //   res.status(500).json({ error: "failed to fetch devices  -- try again." });
  // }
  try {
    const mockDevices = [
      {
        _id: "1",
        deviceName: "Ql5: Audio Mixer",
        ip: "192.168.1.20",
      },
      {
        _id: "2",
        deviceName: "BlackMagic: Video Switcher",
        ip: "192.168.1.21",
      },
    ];

    res.status(200).json(mockDevices); // send mock data devices - TEST
  } catch (error) {
    res.status(500).json({ error: "failed to fetch devices  -- try again." });
  }
});

// * POST /devices - Add new device

router.post("/", async (req, res) => {
  try {
    // stat = created - successful
    res.status(201).json({ message: "Device created!✅😁" });
  } catch (error) {
    // stat =failed to create
    res.status(400).json({ error: "Failed to create device ❌🥺" });
  }
});

// * PUT /devices/:id - Update selected [id] device
// req.params.id - target correct X device

router.put("/:id", async (req, res) => {
  try {
    // stat =req acep=OK
    res
      .status(200)
      .json({ message: `Device: ${req.params.id} was updated ✅` });
  } catch (error) {
    // stat =could not change
    res
      .status(400)
      .json({ error: `Failed to update: ${req.params.id} device ⚠️🟡` });
  }
});

// * DELETE/devices/:id - remve [id] device
router.delete("/:id", async (req, res) => {
  try {
    // stat = succesd OK
    res.status(200).json({
      message: `Device: ${req.params.id} was DELETED SUCCESFULLY ❎ `,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to delete device: ${req.params.id} ❌🔴` });
  }
});

module.exports = router;

// srouces: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
