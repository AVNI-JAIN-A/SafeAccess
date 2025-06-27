import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({
  card_number: { type: String, required: true, unique: true },
  expiry_date: { type: String, required: true },
  encrypted: { type: Boolean, default: true },
  fingerprints: [{
    hash: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model('Card', CardSchema);
