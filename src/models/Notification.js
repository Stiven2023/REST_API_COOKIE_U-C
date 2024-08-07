import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
 userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User'
 },
 message: [{
  type: String,
  required: true
 }],
 actionId: {
  type: mongoose.Schema.Types.ObjectId,
 },
 isRead: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User'
 }]
}, {
 timestamps: true,
 versionKey: false,
});

const Notification = mongoose.model('Notification', NotificationSchema);
export default Notification;