// Considered listing Volume for cup reading. But no. We'll be
// constantly changing how that's calculated, so incorrect
// fixed vals shouldn't be stored in the DB.
// Also, this comment should have been a multi-line comment.

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
