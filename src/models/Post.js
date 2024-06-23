import mongoose from "mongoose";

const Schema = mongoose.Schema;
const postSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    mediaUrl: {
      public_id: String,
      secure_url: String,
    },
    image: {
      type: String,
      required: false,
    },
    userId: {
      type: String,
      required: true,
    },
    likes: [
      {
        userId: {
          type: String,
        },
      },
    ],
    comments: [
      {
        content: {
          type: String,
          required: true,
        },
        emoji: {
          type: String,
          required: false,
        },
        userId: {
          type: Schema.Types.ObjectId,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
