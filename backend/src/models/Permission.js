import mongoose from 'mongoose';

const PermissionSchema = new mongoose.Schema({
  card: { type: mongoose.Schema.Types.ObjectId, ref: 'Card', required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'approved', 'denied', 'expired'], default: 'pending' },
  source_location: { type: String },
  reason: { type: String },
  auto_expire_at: { type: Date }
}, { timestamps: true });

export default mongoose.model('Permission', PermissionSchema);
