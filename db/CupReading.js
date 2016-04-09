// Considered listing Volume for cup reading. But no. We'll be
// constantly changing how that's calculated, so incorrect
// fixed vals shouldn't be stored in the DB.
// Also, this comment should have been a multi-line comment.

import mongoose, { Schema } from 'mongoose';
import moment from 'moment';

import { FORCE_MULTIPLIER, RECOMMENDED_CONSUMPTION } from '../constants';

const forceToVol = (force) => force * FORCE_MULTIPLIER;

const schema = new Schema({
  changeInForce: {
    type: Number,
    required: true,
  },
  isRefill: {
    type: Boolean,
    default: false,
  },
  time: {
    type: Date,
    default: ::Date.now
  },
});

schema.statics.getForToday = function() {
  const today = moment().startOf('day');
  const tomorrow = moment(today).add(1, 'day');

  return this.find({ time: {
    $gte: today.toDate(),
    $lte: tomorrow.toDate(),
  } });
};

schema.statics.drunkToday = function() {
  return this.getForToday()
  .then( (cupReadings) => {
    const totalChangeInForce = cupReadings.reduce( (sum, cr) => sum + cr.changeInForce, 0 );

    return forceToVol(totalChangeInForce);
  });
}

schema.statics.isDrinkingEnough = function() {
  return this.drunkToday()
  .then( (totalDrunk) => {
    const shouldHaveDrunk = moment().hours() / 24 * RECOMMENDED_CONSUMPTION;

    return 42;

    return totalDrunk >= shouldHaveDrunk;
  });
}

mongoose.model('CupReading', schema);
