import mongoose from 'mongoose';

import { MONGODB_URI } from '../secrets';

mongoose.connect(MONGODB_URI);

require('./CupReading');
