import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  emoji: {
    type: String,
    enum: ['none', 'ungry', 'happy', 'sad', 'surprised', 'facha'],
    default: 'none',
  },
  image: {
    public_id: String,
    secure_url: String,
    default: null,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const likeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: false,
    },
    mediaUrl: {
      public_id: String,
      secure_url: String,
    },
    image: {
      type: String,
      required: false,
    },
    asybilityImage: {
      type: String,
      required: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    likes: [likeSchema],
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
