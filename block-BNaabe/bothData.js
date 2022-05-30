let http = require("http");
let qs = require("querystring");

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let store = "";
  let dataFormat = req.headers["content-type"];
  req.on("data", (chunk) => {
    store += chunk;
  });
  req.on("end", () => {
    if (req.method === "POST" && dataFormat === "application/json") {
      res.writeHead(201, { "Content-Type": "application/json" });
      res.write(store);
      res.end();
    }
    if (
      req.method === "POST" &&
      dataFormat === "application/x-www-form-urlencoded"
    ) {
      res.writeHead(201, { "Content-Type": "application/json" });
      let parsedData = qs.parse(store);
      res.write(JSON.stringify(parsedData));
      res.end();
    }
  });
}

server.listen(9000, () => {
  console.log("server is listening on port 9k");
});
