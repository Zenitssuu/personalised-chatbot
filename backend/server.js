import http from "http";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./DB/index.js";
import { webSocketServer } from "./ws/index.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const server = http.createServer(app);



//MIDDLEWARES
app.use(
  cors({
    origin: "http://localhost:3000", // frontend origin
    credentials: true, // allow credentials (cookies)
  })
);
app.use(express.json());
app.use(cookieParser());

// API ROUTES
import authRoutes from "./routes/authRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);

//DB + WS INIT
connectDB().then(() => {
  server.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
  });
  webSocketServer(server);
});