const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const mongoose = require("mongoose");
const routes = require("./routes");
const config = require("./config");

const app = express();

global.__basedir = __dirname;

mongoose
  .connect(config.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database ", config.DB_URL))
  .catch((e) => console.log("Database error:", e));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, x-timebase, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }
//   next();
// });

app.use(
  fileUpload({
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: "./temp/",
  })
);
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "100mb" }));

// Add routes
app.use("/api/v1", routes);

const options = {
  definition: {
    swagger: "2.0",
    info: {
      title: "Pixel NFT Application",
      version: "2.0.1",
    },
    basePath: "/api/v1",
    produces: "application/json",
    securityDefinitions: {
      Bearer: {
        description:
          "Please insert Auth token into header with prefix 'Bearer '",
        in: "header",
        name: "Authorization",
        type: "apiKey",
      },
    },
  },
  apis: ["./controllers/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

if (process.env.NODE_ENV !== "production") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

// Error handling
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: { message: err.message } });
});

module.exports = app;
