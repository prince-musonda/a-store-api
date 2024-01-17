require("dotenv").config();
const mongoose = require("mongoose");
const http = require("http");
const app = require("./app");

const server = http.createServer(app);

const mongoUrl = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");
});

mongoose.connection.on("error", (error) => {
  console.log("failed to connect to database");
  console.log(error);
});

async function startServer() {
  await mongoose.connect(mongoUrl);
  server.listen(3003, () => {
    console.log("server running: 3003");
  });
}

startServer();
