import { model, Schema } from "mongoose";

const MessageSchema = new Schema({
  sessionId: { type: String, required: true },
  role: { type: String, enum: ["user", "model"], required: true },
  text: { type: String, required: true },
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  timestamp: { type: Date, default: Date.now },
});

export const Message = model("Message", MessageSchema);
