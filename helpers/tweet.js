import Twitter from 'twitter';
import { toOrdinal } from 'number-to-words';

let counter = 0;

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET,
});

export default () => new Promise( (resolve, reject) => {
  const status = `Yustynn took his ${toOrdinal(++counter)} sip today and needs you to know!`;

  client.post('statuses/update', { status }, (err, res) => {
    (err) ? reject(err) : resolve(res);
  });
});
