let http = require("http");
let fs = require("fs");
let qs = require("querystring");
let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let store = "";
  if (req.method === "GET" && req.url === "/form") {
    fs.createReadStream("./form.html").pipe(res);
  }
  req.on("data", (chunk) => {
    store += chunk;
  });
  req.on("end", () => {
    if (req.method === "POST" && req.url === "/form") {
      let data = qs.parse(store);
      res.end(
        `<h1>Name: ${data.name}</h1> <p>${data.email}</p> <p>${data.age}</p>`
      );
    }
  });
}

server.listen(5678, () => {
  console.log("server is listening on port 5678");
});
