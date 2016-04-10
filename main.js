if (process.env.NODE_ENV !== 'production') require('./secrets');

import bodyParser from 'body-parser';
import chalk from 'chalk';
import express from 'express';
import morgan from 'morgan';

// Start DB, register the single singular just one just only model
require('./db');

// Fuck l337
const PORT = process.env.PORT || 1338;

const app = express();

// say hello
app.listen(PORT, () => {
	console.log( chalk.blue(`Server eavesdropping on ${ PORT }`) );
} );

app.use( bodyParser.json() );
app.use( morgan('dev') );
// Add headers
 app.use(function (req, res, next) {

// Website you wish to allow to connect
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

// Request methods you wish to allow
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

// Request headers you wish to allow
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

// Set to true if you need the website to include cookies in the requests sent
// to the API (e.g. in case you use sessions)
res.setHeader('Access-Control-Allow-Credentials', true);

// Pass to next layer of middleware
next();
});
app.use( require('./routes') );

require('./jobs');
