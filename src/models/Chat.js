import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  image: {
    public_id: String,
    secure_url: String,
  },
  admins: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }]
}, { _id: false });

const ChatSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  group: GroupSchema,
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message',
  }],
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  deleted: {
    type: Object,
    default: null,
  }
}, {
  timestamps: true,
  versionKey: false,
});

const Chat = mongoose.model('Chat', ChatSchema);
export default Chat;