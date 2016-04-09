import Promise from 'bluebird';
import SparkPost from 'sparkpost';

const { SPARK_POST_API_KEY } = process.env;

const sp = new SparkPost(SPARK_POST_API_KEY);

export default () => new Promise( (resolve, reject) => {
  const transmissionBody = {
    content: {
      from: 'cranky@theleagueofextraordinarycoasters.org',
      subject: 'Goddammit, John!',
      html:'<html><body><h1>DRINK YOUR DAMN WATER!</h1></body></html>'
    },
    recipients: [{
      address: `johnthedehydrated@gmail.com`
    }],
  };

  sp.transmissions.send( { transmissionBody }, (err, res) => {
    (err) ? reject(err) : resolve(res);
  });
});
