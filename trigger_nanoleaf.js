/**
 * Flash a custom pattern on a Nanoleaf instance
 */

const path = require("path");
const http = require("http");

const secretsPath = path.resolve(__dirname, "secrets.json");
const CONFIG = require(secretsPath).ON_COMPLETE;

const postData = JSON.stringify({
  write: {
    command: CONFIG.COMMAND || "displayTemp",
    duration: CONFIG.DURATION || 2,
    animName: CONFIG.ANIM_NAME,
  },
});

const options = {
  hostname: CONFIG.HOSTNAME,
  port: 16021,
  path: CONFIG.PATH,
  method: "PUT",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Content-Length": Buffer.byteLength(postData),
  },
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding("utf8");
  res.on("data", (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on("end", () => {
    console.log("No more data in response.");
  });
});

req.on("error", (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write(postData);
req.end();
