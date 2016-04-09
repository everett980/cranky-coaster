import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI);

require('./CupReading');
