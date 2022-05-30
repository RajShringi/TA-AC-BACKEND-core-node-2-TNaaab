let http = require("http");

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let store = "";
  req.on("data", (chunk) => {
    store += chunk;
  });
  req.on("end", () => {
    if (req.method === "POST" && req.url === "/") {
      res.writeHead(201, { "Content-Type": "application/json" });
      let data = JSON.parse(store);
      res.write(`<h1>${data.name}</h1><h2>${data.email}</h2>`);
      res.end();
    }
  });
}

server.listen(3000, () => {
  console.log("server is listening on port 3k");
});
