const http = require("http");
const app = require("./app");
const event = require("./utils/eventCapture");

const port = process.env.PORT || 4000;
const server = http.createServer(app);

server.listen(port, () => console.log("Gateway listening at port", port));

event();
