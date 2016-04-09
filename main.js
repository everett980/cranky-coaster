import bodyParser from 'body-parser';
import chalk from 'chalk';
import express from 'express';
import mongoose from 'mongoose';

require('./db');

const PORT = 3001;

const app = express();
const CupReading = mongoose.model('CupReading');

const logError = (error) => { console.log( chalk.red(error) ); };

app.listen(PORT, () => { console.log(`Server eavesdropping on ${ PORT }`) } );

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  CupReading.find()
  .then( (cupReadings) => { res.json(cupReadings) } )
  .catch( logError );
})

app.post('/', (req, res, next) => {
  CupReading.create(req.body)
  .then( (cupReading) => { res.json(cupReading)} )
  .catch( logError );
});
