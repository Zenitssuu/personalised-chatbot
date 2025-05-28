import mongoose, { model, Schema } from "mongoose";

const SessionSchema = new Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    summary: {
      type: String,
      default: "",
    },
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

export const Session = model("Session", SessionSchema);
