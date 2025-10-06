/**Immportt required modeuls
 * expresss
 * mongoose
 * cors
 * dotenv
 */

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//  routes
const deviceRoutes = require("./routes/deviceRoutes");

// env. variables -----
require("dotenv").config();

/**Init Express App */
const app = express();
//Middleware
/**(property) Application<Record<string, any>>.use: (...handlers: RequestHandler<ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>[]) => Express (+8 overloads)
 */
app.use(cors()); //allows x-origin req.
app.use(express.json); //parse JSON req.

/** Connect MongoDB Stattus - databse!
 * https://mongoosejs.com/docs/connections.html
 */
// mongoose.connect(process.env.MONGO_URI,(u));
mongoose.connection.on("connected", () =>
  console.log("MongoDB Status: Connected ✅")
);
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on("error", () =>
  console.log("MongoDB Status: Error Connecting to DB 🆘")
);
mongoose.connection.on("disconnected", () =>
  console.log("MongoDB Status: Disconnected❌")
);

/** DEfined Routes --------
 * -devices
 * - users
 */

//device routes
app.use("/api/devices", deviceRoutes);

/** Healtth-check Route / is itt connected? */
app.get("/", (req, res) => {
  res.send("AV SYNC backend is Running 🏃‍♀️✅");
});

// Start Server

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running ✅🏃‍♀️ on PORT: ${PORT}`);
});
