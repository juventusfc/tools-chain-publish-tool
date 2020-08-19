const http = require("http");
const fs = require("fs");
var archiver = require("archiver");

let packname = "./package";
var archive = archiver("zip", {
  zlib: { level: 9 }, // Sets the compression level.
});

archive.directory(packname, false);

const options = {
  host: "127.0.0.1",
  port: 8081,
  path: "/?filename=package.zip",
  method: "POST",
  headers: {
    "Content-Type": "application/octet-stream",
  },
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
});

req.on("error", (e) => {
  console.error(`problem with request: ${e.message}`);
});

// const readStream = fs.createReadStream(packname);

// readStream.pipe(req);
// readStream.on("end", () => {
//   req.end();
// });

archive.pipe(req);
archive.on("end", () => {
  req.end();
});
archive.finalize();
