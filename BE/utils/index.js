const https = require("https");
const jwt = require("jsonwebtoken");
const config = require("../config");

const generateToken = (data, options) =>
  jwt.sign(data, config.JWT_KEY, options);

const decodeToken = (token) => jwt.decode(token);

const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.JWT_KEY);
  } catch (e) {
    console.log("Token invalid", e);
  }
};

const getAddress = (chainId = 4) =>
  config.netConfig.addresses.find(({ chain }) => chain === parseInt(chainId));

const getJsonFromUrl = (url) => {
  return new Promise((resolve, reject) => {
    https
      .get(url, (result) => {
        let body = "";
        result
          .on("data", (chunk) => {
            body += chunk;
          })
          .on("error", reject)
          .on("end", () => {
            let ret = null;
            try {
              ret = JSON.parse(body);
            } catch (e) {
              console.log("Error on fetching Json from URL: ", url, e);
            }
            resolve(ret);
          });
      })
      .on("socket", (socket) => {
        socket.on("timeout", () => reject("Socket Timeout"));
        socket.on("connect", () => console.log("Connect to:", url));
        socket.on("error", () => reject("Socket error"));
      })
      .on("error", (err) => reject(err));
  });
};

const getApiUrl = (req) => req.protocol + "://" + req.get("host") + "/api/v1";

module.exports = {
  generateToken,
  decodeToken,
  verifyToken,
  getAddress,
  getJsonFromUrl,
  getApiUrl,
};
