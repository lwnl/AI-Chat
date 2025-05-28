import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMessage extends Document {
  chatId: mongoose.Types.ObjectId;
  role: string;
  content: string;
}

const MessageSchema: Schema = new Schema(
  {
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
    role: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export const Message: Model<IMessage> = mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);