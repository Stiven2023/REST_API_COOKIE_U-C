import mongoose from "mongoose";

const { Schema } = mongoose;

export const userSchema = new Schema({
  userId: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    required: true,
  },
  nickName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export const commentSchema = new Schema(
  {
    type: mongoose.Schema.Types.ObjectId,
    content: {
      type: String,
      required: true,
    },
    emoji: {
      type: String,
      enum: ["ungry", "happy", "sad", "none"],
      default: "none",
      required: false,
    },
    user: userSchema,
  },
  { timestamps: true }
);

export const likeSchema = new Schema(
  {
    type: mongoose.Schema.Types.ObjectId,
    user: userSchema,
  },
  { timestamps: true }
);

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    user: userSchema,
    likes: [likeSchema],
    comments: [commentSchema],
  },
  { timestamps: true }
);

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;
