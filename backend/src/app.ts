import express from "express";
import authRoutes from "./routes/authRoutes";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";
import llmRoutes from "./routes/llmRoutes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swaggerConfig";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";

// Initialize Express app
const app = express();
dotenv.config();
// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(bodyParser({ limit: "1000mb" }));

// Uploads
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/llm", llmRoutes);

// Swagger API Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// frontent
app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
  });

export default app;
