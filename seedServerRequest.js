import rp from 'request-promise';
import { FORCE_MULTIPLIER as multiplier, RECOMMENDED_CONSUMPTION as dailyConsumption } from './constants';
import moment from 'moment';

const numSips = Math.floor(((90 + Math.random() * 20) * 420) / 100);
const avgSipVolume = (7 * dailyConsumption / numSips) / multiplier; 

const lastWeek = moment().subtract(1, 'weeks').toDate().getTime();
const range = moment().toDate().getTime() - lastWeek;

const sipEntryArr = [];
for(var i = 0; i < numSips; i++) { 
	sipEntryArr.push({
		changeInForce: Math.floor( ( 70 + Math.random() * 60 ) / 100 * avgSipVolume + .5),
		time: new Date( Math.floor ( lastWeek + range / numSips * i + .5) )
	});
}

rp({
	method: 'DELETE',
	uri: `https://lit-savannah-65925.herokuapp.com/clearFb`,
}).then((deleted) => {
	console.log(deleted);
	return rp({
		method: 'DELETE',
		   uri: `https://lit-savannah-65925.herokuapp.com/clearMongo`
	})
}).then((deleted) => {
	console.log(deleted);
	return rp({
		body: JSON.stringify(sipEntryArr),
		   method: 'POST',
		   uri: `https://lit-savannah-65925.herokuapp.com/api/cupReadings`,
		   headers: {
			   'Content-Type': 'application/json',
		   },
	})
})
	.then( ::console.log )
.catch( ::console.error )
