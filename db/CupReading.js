// Considered listing Volume for cup reading. But no. We'll be
// constantly changing how that's calculated, so incorrect
// fixed vals shouldn't be stored in the DB.
// Also, this comment should have been a multi-line comment.

import mongoose, { Schema } from 'mongoose';
import moment from 'moment';

const RECOMMENDED_CONSUMPTION = 2000; // 2 litres
const forceToVol = (force) => force * 2.5;

const schema = new Schema({
  changeinForce: {
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

schema.static.getForToday = function() {
  const today = moment().startOf('day');
  const tomorrow = moment(day).add(1, 'day');

  return this.constructor.find({ time: {
    $gte: today.toDate(),
    $lte: tomorrow.toDate(),
  } });
};

schema.static.isDrinkingEnough = function() {
  this.constructor.getForToday()
  .then( (cupReadings) => {
    const totalDrunk = forceToVol( cupReadings.reduce( (currSum, nextCr) => currSum + nextCr, 0 ) );
    const shouldHaveDrunk = moment().hours() / 24 * RECOMMENDED_CONSUMPTION;

    return totalDrunk >= shouldHaveDrunk;
  })
}

mongoose.model('CupReading', schema);
