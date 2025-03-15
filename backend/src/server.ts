import fs from "fs";
import https from "https";
import http from "http";
import app from "./app";
import connectDB from "./config/db";

// Connect to Database
connectDB();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

if (NODE_ENV === "production") {
  const options = {
    key: fs.readFileSync("client-key.pem"),
    cert: fs.readFileSync("client-cert.pem"),
  };
  
  https.createServer(options, app).listen(PORT, () => {
    console.log(`HTTPS Server is running in production mode on port ${PORT}`);
  });
} else {
  http.createServer(app).listen(PORT, () => {
    console.log(`HTTP Server is running in ${NODE_ENV} mode on port ${PORT}`);
  });
}
