import { Router } from 'express';
import chalk from 'chalk';
import mongoose from 'mongoose';
import Firebase from 'firebase';

import { FIREBASE_URI } from './secrets';

const CupReading = mongoose.model('CupReading');
const fbRef = new Firebase(FIREBASE_URI);
const router = Router();

// let's paint the world
const logError = (sadness) => { console.log( chalk.red(sadness) ); };
const logSuccess = (happiness) => { console.log( chalk.green(happiness) ); };

// yes Everett, yes.
const genDelSuccessMsg = () => {
  const messages = [
    'Shut the fuck up, Adele',
    'I set fire to the base',
    '...Boom!',
    'The sky is falling! But in a good way.',
    'I am become death, destroyer of firebases',
    'Yes.',
    'You loyal',
    'Buy yo mamma a house',
    'Crank crank!',
  ];

  return messages[ Math.floor( messages.length * Math.random() ) ];
};

router.get('/', (req, res, next) => {
  CupReading.find()
  .then( (cupReadings) => { res.json(cupReadings) } )
  .catch( logError );
})

router.post('/', (req, res, next) => {
  const mongoProm = CupReading.create(req.body);
  const fbProm = fbRef.push(req.body);

  Promise.all([mongoProm, fbProm])
  .then( ([cupReading]) => { res.json(cupReading)} )
  .catch( logError );
});

router.delete('/clearFb', (req, res, next) => {
  fbRef.set([])
  .then( logSuccess )
  .then( () => { res.send( genDelSuccessMsg() ) })
  .catch( (err) => {
    logError(err);
    res.status(500).send(`bad things happened. But it's okay, because I'm sorry.`)
  } )
});

module.exports = router;
