/** User Routes
 * GET /users - list ALL users
 * POST /users - Add new User
 * PUT /users/:id - Update selected [id] User
 * DELETE/users/:id - remove [id] User
 */

const express = require("express");
const router = express.Router();

// * GET /users - list ALL users
router.get("/", async (req, res) => {
  try {
    // stat = OK
    res.status(200).json({ message: "Get all users in system" });
  } catch (error) {
    // stat = server err 500
    res.status(500).json({ error: "failed to fetch users  -- try again." });
  }
});

// * POST /users - Add new User

router.post("/", async (req, res) => {
  try {
    // stat = created - successful
    res.status(201).json({ message: "User created!✅😁" });
  } catch (error) {
    // stat =failed to create
    res.status(400).json({ error: "Failed to create user ❌🥺" });
  }
});

// * PUT /users/:id - Update selected [id] User
// req.params.id - target correct X User

router.put("/:id", async (req, res) => {
  try {
    // stat =req acep=OK
    res.status(200).json({ message: `User: ${req.params.id} was updated ✅` });
  } catch (error) {
    // stat =could not change
    res
      .status(400)
      .json({ error: `Failed to update: ${req.params.id} User ⚠️🟡` });
  }
});

// * DELETE/users/:id - remve [id] User
router.delete("/:id", async (req, res) => {
  try {
    // stat = succesd OK
    res.status(200).json({
      message: `User: ${req.params.id} was DELETED SUCCESFULLY ❎ `,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to delete User: ${req.params.id} ❌🔴` });
  }
});

module.exports = router;

// srouces: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
