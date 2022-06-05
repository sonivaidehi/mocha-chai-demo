/**
 * app.js
 * Use `app.js` to run your app.
 * To start the server, run: `node app.js`.
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
global.__basedir = __dirname;
require('./config/db');

let logger = require('morgan');
const app = express();
const corsOptions = { origin: process.env.ALLOW_ORIGIN, };
app.use(cors(corsOptions));

//template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(require('./utils/response/responseHandler'));

//all routes 
const routes = require('./routes/auth');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`your application is running on ${process.env.PORT}`);
});
