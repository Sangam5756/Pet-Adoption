// In models/adoptionApplication.model.js

import mongoose from 'mongoose';

const adoptionApplicationSchema = mongoose.Schema(
  {

    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    petId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'petmodel',
      required: true,
    },
    status: {
      type: String,
      default: 'available',
    },
  },
  { timestamps: true }
);

const AdoptionApplication = mongoose.model('AdoptionApplication', adoptionApplicationSchema);

export default AdoptionApplication;
