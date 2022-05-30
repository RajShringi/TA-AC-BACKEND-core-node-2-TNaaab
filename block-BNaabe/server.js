let path = require("path");
console.log(__filename);
console.log(__dirname + "/app.js");
console.log("./index.js");
let indexPath = path.join(__dirname, "index.js");
console.log(indexPath);
