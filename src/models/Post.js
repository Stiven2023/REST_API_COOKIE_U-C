import mongoose from "mongoose";

const Schema = mongoose.Schema;
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
