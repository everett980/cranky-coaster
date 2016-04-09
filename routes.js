import { Router } from 'express';
import chalk from 'chalk';
import mongoose from 'mongoose';
import Firebase from 'firebase';

import { getRandEl } from './helpers';
import sendSms from './helpers/sendSms';

const { FIREBASE_URI } = process.env;
const CupReading = mongoose.model('CupReading');
const firebaseRef = new Firebase(FIREBASE_URI);
const router = Router();

// let's paint the world
const logError = (sadness) => { console.log( chalk.red(sadness) ); };
const logSuccess = (happiness) => { console.log( chalk.green(happiness) ); };

const handleError = (res) => (err) => {
  logError(err);
  res.send(err);
}

const sendRes = (res) => (content) => { console.log(content); res.send(content) };

// yes Everett, yessss.
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

  console.log(getRandEl(messages))

  return getRandEl(messages);
};

router.get('/api/cupReadings', (req, res, next) => {
  CupReading.find()
  .then( (cupReadings) => { res.json(cupReadings) } )
  .catch( handleError(res) );
})

router.post('/api/cupReadings', (req, res, next) => {
  const mongoProm = CupReading.create(req.body);
  const firebaseProm = firebaseRef.push(req.body);

  Promise.all([mongoProm, firebaseProm])
  .then( ([cupReading]) => { res.json(cupReading)} )
  .catch( handleError(res) );
});


router.post('/sms', (req, res, next) => {
  sendSms('Yus Yestynn')
  .then( () => { res.send('Sent!') } )
  .catch( (err) => { res.send(err) } );
});


// the following routes are exposed solely for tests

router.get('/api/cupReadings/isEnough', (req, res, next) => {
  CupReading.isDrinkingEnough()
  .then( sendRes(res) )
  .catch( handleError(res) );
});

router.get('/api/cupReadings/drunkToday', (req, res, next) => {
  CupReading.drunkToday()
  .then( sendRes(res) )
  .catch( handleError(res) );
});

router.delete('/clearFb', (req, res, next) => {
  firebaseRef.set([])
  .then( logSuccess )
  .then( () => { res.send( genDelSuccessMsg() ) })
  .catch( handleError(res) );
});

router.delete('/clearMongo', (req, res, next) => {
  mongoose.connection.db.dropCollection('cupreadings', (err, result) => {
    if (err) {
      console.error(err);
      res.send( `sadness :(` );
    }
    else {
      console.log(result);
      res.send( `happiness! :)` );
    }
  });
});

module.exports = router;
