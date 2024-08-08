import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const storySchema = new Schema({
 userId: {
  type: Schema.Types.ObjectId,
  ref: 'User'
 },
 content: {
  type: String,
  required: true,
 },
 image: {
  public_id: String,
  secure_url: String,
 },
 isViewed: [{
  type: Schema.Types.ObjectId,
  ref: 'User'
 }],
 likes: [{
  type: Schema.Types.ObjectId,
  ref: 'User'
 }],
}, {
 timestamps: true,
 versionKey: false,
});

const Story = mongoose.model('Story', storySchema);
export default Story;