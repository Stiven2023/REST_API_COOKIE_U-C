import { Schema, model } from "mongoose";
import { z } from "zod";

const MessageSchemaValidator = z.object({
  sender: z.string(), 
  content: z.string(),
  mediaURL: z.string(),
  createdAt: z.date(),
});

type MessageData = z.infer<typeof MessageSchemaValidator>;

const MessageSchema = new Schema<MessageData>({
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  content: String,
  mediaURL: String,
  createdAt: { type: Date, default: Date.now },
});

const MessageModel = model("Message", MessageSchema);

export { MessageModel };