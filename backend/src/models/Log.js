import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  card: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ['success', 'failure'], required: true },
  location: { type: String }
}, { timestamps: true });

export default mongoose.model('Log', LogSchema);
