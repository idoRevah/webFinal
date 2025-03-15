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

// Initialize Express app
const app = express();
dotenv.config();
// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
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

export default app;
