## Notes from local-device scanner

- wanted to claen up my origina scan.js file to use
- but still wanted to keep these for future reference ---

// // test file for the local-device scann ----
// /\*_-https://github.com/DylanPiercey/local-devices
// _
// _
// _
// _ great source + examples _/
// // -------- TEST VERSION
// // const find = require("local-devices");

// // find().then((devices) => {
// // // log stats --
// // devices.forEach((device, i) => {
// // // forEach loop - fetch props --
// // console.log(
// // `${i + 1}. ${device.ip} — ${device.mac || "MAC Unknown"} — ${
// //         device.name || "Unknown Hostname"
// //       }`
// // );
// // });
// // });

// const axios = require("axios");
// const find = require("local-devices");

// async () => {
// const devices = await find();
// console.log(`Found ${devices.length} device(s) ...\n`);

// // for loop -- go through [] to fetch props---
// for (const [i, device] of devices.entries()) {
// // define propr fetchde/ refernced

// const payload = {
// // fetch props ---
// deviceName: device.name || device.mac || "Unknown Device",
// ip: device.ip,
// mac: device.mac || "00:00:00:00:00:00",
// };
// console.log(
// `${i + 1}. ${payload.ip} - ${payload.mac} - ${payload.deviceName}`
// );
// try {
// // await ------ axios POST METHD

// const res = await axios.post("http://localhost");
// } catch (error) {}
// }
// };

// /\*_ For future reference -------
// _ // Find all local network devices.
// find().then(devices => {
// devices /_
// [
// { name: '?', ip: '192.168.0.10', mac: '...' },
// { name: '...', ip: '192.168.0.17', mac: '...' },
// { name: '...', ip: '192.168.0.21', mac: '...' },
// { name: '...', ip: '192.168.0.22', mac: '...' }
// ]
// _/
// /\*
// })
// // Using a transpiler
// import find from 'local-devices'
// // Without using a transpiler
// const find = require('local-devices');

// // Find all local network devices.
// find().then(devices => {
// devices /_
// [
// { name: '?', ip: '192.168.0.10', mac: '...' },
// { name: '...', ip: '192.168.0.17', mac: '...' },
// { name: '...', ip: '192.168.0.21', mac: '...' },
// { name: '...', ip: '192.168.0.22', mac: '...' }
// ]
// _/
// /\*})

// // Find a single device by ip address.
// find({ address: '192.168.0.10' }).then(device => {
// device /_
// {
// name: '?',
// ip: '192.168.0.10',
// mac: '...'
// }
// _/

// /\* })

// // Find all devices within 192.168.0.1 to 192.168.0.25 range
// find({ address: '192.168.0.1-192.168.0.25' }).then(devices => {
// devices /_
// [
// { name: '?', ip: '192.168.0.10', mac: '...' },
// { name: '...', ip: '192.168.0.17', mac: '...' },
// { name: '...', ip: '192.168.0.21', mac: '...' },
// { name: '...', ip: '192.168.0.22', mac: '...' }
// ]
// _/
// /\* })

// // Find all devices within /24 subnet range of 192.168.0.x
// find({ address: '192.168.0.0/24' }).then(devices => {
// devices /_
// [
// { name: '?', ip: '192.168.0.10', mac: '...' },
// { name: '...', ip: '192.168.0.50', mac: '...' },
// { name: '...', ip: '192.168.0.155', mac: '...' },
// { name: '...', ip: '192.168.0.211', mac: '...' }
// ]
// _/
// /\* })

// // Find all devices without resolving host names (Uses 'arp -an') - this is more performant if hostnames are not needed
// // (This flag is ignored on Windows machines as 'arp -an' is not supported)
// find({ skipNameResolution: true }).then(devices => {
// devices /_
// [
// { name: '?', ip: '192.168.0.10', mac: '...' },
// { name: '?', ip: '192.168.0.50', mac: '...' },
// { name: '?', ip: '192.168.0.155', mac: '...' },
// { name: '?', ip: '192.168.0.211', mac: '...' }
// ]
// _/
// /\*

// })

// // Find all devices, specifying your own path for the `arp` binary
// find({ arpPath: '/usr/sbin/arp' }).then(devices => {
// devices /_
// [
// { name: '?', ip: '192.168.0.10', mac: '...' },
// { name: '?', ip: '192.168.0.50', mac: '...' },
// { name: '?', ip: '192.168.0.155', mac: '...' },
// { name: '?', ip: '192.168.0.211', mac: '...' }
// ]})
// _/
