import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reportPostSchema = new Schema({
  type: Schema.Types.ObjectId,
  userId: {
    type: Schema.Types.ObjectId,
  },
  postId: {
    type: Schema.Types.ObjectId,
  },
  reason: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const reportCommentSchema = new Schema({
  type: Schema.Types.ObjectId,
  userId: {
    type: Schema.Types.ObjectId,
  },
  postId: {
    type: Schema.Types.ObjectId,
  },
  commentId: {
    type: Schema.Types.ObjectId,
  },
  reason: {
    type: String,
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


const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  emoji: {
    type: String,
    enum: ["none", "ungry", "happy", "sad", "surprised", "facha"],
    default: "none",
  },
  image: {
    public_id: {
      type: String,
      required: false,
    },
    secure_url: {
      type: String,
      required: false,
    },
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  reports: [reportCommentSchema],
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
    activity: {
      type: String,
      required: false,
    },
    place: {
      type: String,
      required: false,
    },
    tagsUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    reports: [reportPostSchema],
    likes: [likeSchema],
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
