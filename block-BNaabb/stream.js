let http = require("http");

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let store = "";
  req.on("data", (chunck) => {
    store += chunck;
  });
  req.on("end", () => {
    if ((req.method === "POST", req.url === "/")) {
      res.write(store);
      res.end();
    }
  });
}

server.listen(3456, () => {
  console.log("server is listening on port 3456");
});
