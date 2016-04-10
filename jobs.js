import scheduler from 'node-schedule';
import mongoose from 'mongoose';
import rp from 'request-promise'

import tweet from './helpers/tweet';

const CupReading = mongoose.model('CupReading');

// SCOLD!
const postToFacebook = () => { };
// naughty naughty non-restful request
const sendSms = () => rp.get(`https://nameless-beyond-23569.herokuapp.com/send`);
const yell = () => { };


// BRAG!
const sendEmail = () => { };

const overallJob = () => {
  console.log('doing the thing');
  CupReading.isDrinkingEnough()
  .then( (isDrinkingEnough) => {
    console.log(`He's drinking enough! True or false?    ${ isDrinkingEnough }`);
    if (isDrinkingEnough) {
      return Promise.all( [sendEmail(), tweet()] );
    }
    else {
      return Promise.all( [postToFacebook(), sendSms(), yell()] );
    }
  })
  .then( () => { console.log('WHEE!') } )
  .catch( (err) => { console.log('NOOO!') } )
}

// do the job!
scheduler.scheduleJob('0 0 1 * * *', overallJob)
