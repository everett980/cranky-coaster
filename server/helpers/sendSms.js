import chalk from 'chalk';
import twilio from 'twilio';

import { PHONE_NUMBER, TWILIO_SID, TWILIO_AUTH_TOKEN } from '../secrets';

const client = twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);

export default (message) => new Promise( (resolve, reject) => {
  client.messages.create({
      body: message,
      to: PHONE_NUMBER,
      from: '+12015968899',
  }, function(err, message) {
      if (err) reject(err);
      resolve(message);
  });
} );
