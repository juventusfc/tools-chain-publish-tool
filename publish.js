const http = require("http");
const fs = require("fs");
const querystring = require("querystring");

let filename = "./m8.jpg";
fs.stat(filename, (error, stat) => {
  console.log(stat.size);
  const options = {
    host: "127.0.0.1",
    port: 8081,
    path: "/?filename=" + filename,
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Length": stat.size,
    },
  };

  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    /*
    res.setEncoding("utf8");
    res.on("data", (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on("end", () => {
      console.log("No more data in response.");
    });
    */
  });

  req.on("error", (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  const readStream = fs.createReadStream("./m8.jpg");

  // Write data to request body
  readStream.pipe(req);
  readStream.on("end", () => {
    req.end();
  });
});
