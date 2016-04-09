import mongoose from 'mongoose';

import { DB_URI } from '../secrets';

mongoose.connect(DB_URI);

require('./CupReading');
