import rp from 'request-promise';

rp({
  body: JSON.stringify({ changeInForce: 1 }),
  method: 'POST',
  uri: `https://lit-savannah-65925.herokuapp.com/api/cupReadings`,
  headers: {
    'Content-Type': 'application/json',
  },
})
.then( ::console.log )
.catch( ::console.error )
