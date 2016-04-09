import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  forceVal: {
    type: Number,
    required: true,
  },
  isRefill: {
    type: Boolean,
    default: false,
  },
});

mongoose.model('CupReading', schema);
