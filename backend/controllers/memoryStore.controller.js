import { Message } from "../models/Message.model.js";
import { Session } from "../models/Sessions.model.js";

const saveMessage = async (sessionId, role, text, userId) => {
  // console.log(sessionId,role,text);

  await Message.create({ sessionId, role, text });
  const exists = await Session.exists({ sessionId });
  if (!exists) {
    await Session.create({ sessionId });
  }
};

const getSessionMessages = async (sessionId, limit = 12) => {
  return await Message.find({ sessionId })
    .sort({ timestamp: -1 })
    .limit(limit)
    .lean()
    .then((msgs) => msgs.reverse()) // maintain order
    .then((msgs) =>
      msgs.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }))
    );
};

const resetSessionMemory = async (sessionId) => {
  await Message.deleteMany({ sessionId });
  await Session.deleteOne({ sessionId });
};

const saveSummary = async (sessionId, summaryText) => {
  await Session.updateOne({ sessionId }, { summary: summaryText });
};

const getSummary = async (sessionId) => {
  const session = await Session.findOne({ sessionId }).lean();
  return session?.summary || "";
};

export {
  saveMessage,
  getSessionMessages,
  resetSessionMemory,
  saveSummary,
  getSummary,
};
