import mongoose from 'mongoose';

const FingerprintSchema = new mongoose.Schema({
  hash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  account_number: { type: String, required: true, unique: true },
  card_number: { type: String, required: true, unique: true },
  card_status: { type: String, enum: ['active', 'blocked'], default: 'active' },
  fingerprints: [FingerprintSchema],
  is_primary: { type: Boolean, default: false },
  secondary_users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
