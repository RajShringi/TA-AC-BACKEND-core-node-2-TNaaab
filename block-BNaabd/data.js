let http = require("http");
let qs = require("querystring");
let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let dataFormat = req.headers["content-type"];
  let store = "";

  req.on("data", (chunk) => {
    store += chunk;
  });

  req.on("end", () => {
    if (req.method === "POST" && req.url === "/json") {
      res.write(store);
      res.end();
    }
    if (req.method === "POST" && req.url === "/form") {
      let parsedData = qs.parse(store);
      res.write(JSON.stringify(parsedData));
      res.end();
    }
  });
}

server.listen(7000, () => {
  console.log("server is listening on port 7k");
});
