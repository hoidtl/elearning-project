import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  website: {
    type: String,
  },
  contactPerson: {
    name: String,
    phone: String,
    email: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

supplierSchema.index({ name: 1 });

export default mongoose.model('Supplier', supplierSchema);
