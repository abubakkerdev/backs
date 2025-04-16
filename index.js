require("dotenv").config();
const express = require("express");
// const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const socketIo = require("socket.io");
const databaseConnect = require("./app/database/mongodb");
const routes = require("./app/routes");
const http = require("http");
const cors = require("cors");
const corsPermission = require("./app/config/backend/corsConfig");
const app = express();
const port = process.env.APP_PORT;
const server = http.createServer(app);
const socketConnection = require("./app/socket/socketConnect");
const urlImage = process.env.BASE_URL;
const cookieSecretKey = process.env.COOKIE_SECRET_KEY;

// Enable case-sensitive routing
app.enable("case sensitive routing");

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

// Cors site permission 
app.use(cors(corsPermission));

// Using cookie-parser middleware with a secret key
app.use(cookieParser(cookieSecretKey)); 

const io = socketIo(server, {
  cors: {
    origin: ["https://jomaas-admin-panel.vercel.app", "https://deeplearndl.vercel.app"],
  },
});

io.on("connection", function (socket) {
  socketConnection(io, socket);
});

// All request data format is JSON
app.use(express.json());

// DB Connection
databaseConnect();

// Access all Images
app.use(
  `${urlImage}/frontend/public/images`,
  express.static(`${__dirname}/public/images`)
);

// All api route
app.use(routes);

app.get("/home", (req, res) => {
  res.send("Hello World!");
});

// 404 error handler
app.use((req, res, next) => {
  res.status(404).json({ error: "The requested URL was not found." });
});

// Server side error handler
app.use((err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).json({ error: "There was an upload Error." });
    } else {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(500).json({ error: "There was an server-side Error." });
  }
});

server.listen(port, () => {
  console.log(`My App listening On Port http://localhost:${port}`);
});
