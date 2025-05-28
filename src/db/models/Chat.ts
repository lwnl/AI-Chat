import mongoose, { Schema, Document, Model } from "mongoose";

export interface IChat extends Document {
  userId: string;
  title: string;
  modelName: string;
}

const ChatSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    modelName: { type: String, required: true },
  },
  { timestamps: true }
);

export const Chat: Model<IChat> = mongoose.models.Chat || mongoose.model<IChat>("Chat", ChatSchema);