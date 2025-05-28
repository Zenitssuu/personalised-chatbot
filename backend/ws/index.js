import {WebSocketServer} from 'ws';
import { socketHandler } from './socketHandler.js';

export const webSocketServer = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    console.log('🟢 New client connected');

    ws.on('message', (data) => socketHandler(ws, data));

    ws.on('close', () => console.log('🔴 Client disconnected'));
    ws.on('error', (err) => console.log('⚠️ WS Error:', err.message));
  });

  console.log('🌐 WebSocket server ready');
}

// ws/index.js
// import { WebSocketServer } from "ws";
// import { parse } from "cookie";
// import jwt from "jsonwebtoken";
// import { socketHandler } from "./socketHandler.js";

// export const webSocketServer = (server) => {
//   const JWT_SECRET = process.env.JWT_SECRET;
//   const wss = new WebSocketServer({ noServer: true });

//   server.on("upgrade", (req, socket, head) => {
//     const cookies = parse(req.headers.cookie || "");
//     const token = cookies.token;

//     if (!token) {
//       socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
//       socket.destroy();
//       return;
//     }

//     try {
//       const decoded = jwt.verify(token, JWT_SECRET);
//       const userId = decoded.userId;

//       wss.handleUpgrade(req, socket, head, (ws) => {
//         ws.userId = userId;
//         wss.emit("connection", ws, req);
//       });
//     } catch (err) {
//       socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
//       socket.destroy();
//     }
//   });

//   wss.on("connection", (ws) => {
//     console.log("🟢 WS Connected as user:", ws.userId);
//     ws.on("message", (data) => socketHandler(ws, data));
//     ws.on("close", () => console.log("🔴 Client disconnected"));
//     ws.on("error", (err) => console.log("⚠️ WS Error:", err.message));
//   });

//   console.log("🌐 WebSocket server ready");
// };
