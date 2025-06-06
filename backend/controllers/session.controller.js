import { Session } from "../models/Sessions.model.js";

export const getAllSessions = async (req, res) => {
  // console.log(req.body);
  const userId = req?.user.userId;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const sessions = await Session.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Session.countDocuments({ userId });

    console.log(sessions);

    return res.status(200).json({
      sessions: sessions.map((s) => ({
        id: s.sessionId,
        title: `Conversation on ${new Date(s.createdAt).toLocaleDateString()}`,
        lastUpdated: s.createdAt,
        summary: s.summary || "",
      })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("❌ Session fetch failed:", err);
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
};
