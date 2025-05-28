import { askGemini } from "../llm/llm.js";
import {
  saveMessage,
  getSessionMessages,
  resetSessionMemory,
  getSummary,
} from "../controllers/memoryStore.controller.js";
import { summarizeSession } from "../controllers/summarizer.controller.js";

export const socketHandler = async (ws, rawData) => {
  try {
    const { type, payload, persona = "friendly",sessionId } = JSON.parse(rawData);
    // const sessionId = ws._socket.remoteAddress + ":" + ws._socket.remotePort;
    // console.log("sessionID",typeof(sessionId));
    // console.log("payload",payload);
    switch (type) {
      case "speak":
        await saveMessage(sessionId, "user", payload);
        const pastMessages = await getSessionMessages(sessionId);
        const summary = await getSummary(sessionId);

        const reply = await askGemini(
          sessionId,
          payload,
          persona,
          pastMessages,
          summary
        );

        // console.log(sessionId);

        await saveMessage(sessionId, "model", reply);

        if (pastMessages.length >= 10 && pastMessages.length % 10 === 0) {
          const newSummary = await summarizeSession(pastMessages);
          await saveSummary(sessionId, newSummary);
          console.log(`[📋 Memory Summary]: ${newSummary}`);

        }

        ws.send(JSON.stringify({ type: "llm-response", payload: reply }));
        break;

      case "reset-memory":
        await resetSessionMemory(sessionId);
        ws.send(JSON.stringify({ type: "info", payload: "Memory cleared." }));
        break;

      default:
        ws.send(
          JSON.stringify({ type: "error", payload: "Unknown message type" })
        );
    }
  } catch (err) {
    console.error("WebSocket Error:", err);
    ws.send(JSON.stringify({ type: "error", payload: "Something went wrong" }));
  }
};

// export const socketHandler = async (ws, rawData) => {
//   const userId = ws.userId; // 🎯 this is your JWT user

//   try {
//     const {
//       type,
//       payload,
//       sessionId,
//       persona = "friendly",
//     } = JSON.parse(rawData);

//     if (!userId) {
//       ws.send(JSON.stringify({ type: "error", payload: "Unauthorized user" }));
//       return;
//     }

//     switch (type) {
//       case "speak":
//         await saveMessage(sessionId, "user", payload, userId);
//         const pastMessages = await getSessionMessages(sessionId);
//         const summary = await getSummary(sessionId);

//         const reply = await askGemini(
//           sessionId,
//           payload,
//           persona,
//           pastMessages,
//           summary
//         );

//         await saveMessage(sessionId, "model", reply, userId);

//         if (pastMessages.length >= 10 && pastMessages.length % 10 === 0) {
//           const newSummary = await summarizeSession(pastMessages);
//           await saveSummary(sessionId, newSummary);
//           console.log(`[📋 Memory Summary]: ${newSummary}`);
//         }

//         ws.send(JSON.stringify({ type: "llm-response", payload: reply }));
//         break;

//       case "reset-memory":
//         await resetSessionMemory(sessionId);
//         ws.send(JSON.stringify({ type: "info", payload: "Memory cleared." }));
//         break;

//       default:
//         ws.send(
//           JSON.stringify({ type: "error", payload: "Unknown message type" })
//         );
//     }
//   } catch (err) {
//     console.error("WebSocket Error:", err.message);
//     ws.send(JSON.stringify({ type: "error", payload: "Server error" }));
//   }
// };
