import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
 sender: {
  type: Schema.Types.ObjectId,
  ref: 'User'
 },
 content: [{
  type: String,
 }],
 mediaUrl: {
  public_id: String,
  secure_url: String
 }
},
 {
  timestamps: true,
  versionKey: false,
 }
);

const Message = mongoose.model('Message', MessageSchema);
export default Message;