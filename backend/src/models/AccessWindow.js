import mongoose from 'mongoose';

const AccessWindowSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  card: { type: mongoose.Schema.Types.ObjectId, ref: 'Card', required: true },
  start_time: { type: String, required: true }, // e.g. '08:00'
  end_time: { type: String, required: true },   // e.g. '18:00'
  date: { type: Date, required: true }
}, { timestamps: true });

export default mongoose.model('AccessWindow', AccessWindowSchema);
