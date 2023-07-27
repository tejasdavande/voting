const http = require("http");  // http module in node.js
const app = require("./app");
require("dotenv").config();
const server = http.createServer(app);

const port = process.env.PORT || 5000;
console.log(port);

//function for server listening
server.listen(port, () => {
  console.log(`server is running on port  ${port}`);
});
