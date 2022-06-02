let fs = require("fs");
let http = require("http");
let url = require("url");
const userDir = __dirname + "/users/";
let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let store = "";
  let parsedUrl = url.parse(req.url, true);
  req.on("data", (chunk) => {
    store += chunk;
  });
  req.on("end", () => {
    if (req.method === "POST" && req.url === "/users") {
      let username = JSON.parse(store).username;
      fs.open(`${userDir}${username}.json`, "wx", (err, fd) => {
        if (err) {
          res.end("User already present");
          return console.log(err);
        }
        fs.writeFile(fd, store, (err) => {
          fs.close(fd, (err) => {
            res.end(`${username} successfully created`);
          });
        });
      });
    } else if (req.method === "GET" && parsedUrl.pathname === "/users") {
      let user = parsedUrl.query.username;
      fs.readFile(`${userDir}${user}.json`, (err, user) => {
        res.setHeader("Content-Type", "application/json");
        res.end(user);
      });
    } else if (req.method === "DELETE" && parsedUrl.pathname === "/users") {
      let user = parsedUrl.query.username;
      fs.unlink(`${userDir}${user}.json`, (err) => {
        if (err) {
          res.end(err);
        }
        res.end(`${user} file is deleted`);
      });
    } else if (req.method === "PUT" && parsedUrl.pathname === "/users") {
      let user = parsedUrl.query.username;
      fs.open(`${userDir}${user}.json`, "r+", (err, fd) => {
        if (err) throw err;
        fs.ftruncate(fd, (err) => {
          fs.writeFile(fd, store, (err) => {
            fs.close(fd, (err) => {
              res.end("user updated");
            });
          });
        });
      });
    } else {
      res.statusCode = 404;
      res.end("Page not found");
    }
  });
}

server.listen(3000, () => {
  console.log("Server is listening on port 3k");
});
