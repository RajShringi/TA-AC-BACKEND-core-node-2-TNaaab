let http = require("http");
let qs = require("querystring");

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let store = "";
  req.on("data", (chunk) => {
    store += chunk;
  });
  req.on("end", () => {
    if (req.method === "POST" && req.url === "/") {
      res.writeHead(201, { "Content-Type": "text/plain" });
      let parsedData = qs.parse(store);
      res.write(JSON.stringify(parsedData.captain));
      res.end();
    }
  });
}

server.listen(3000, () => {
  console.log("server is listening on port 3k");
});
