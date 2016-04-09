require('./secrets')

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
app.use( require('./routes') );
