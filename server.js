const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const uuid = require('node-uuid');

const app = express();
//winston is a logging library
const winston = require('winston');
const nconf = require('nconf');

const DATA_FILE = path.join(__dirname, 'qvvariables.json');
const APPNAME_DATA = path.join(__dirname, 'appnames.json');


//nconf set up -- get from command line (if any) first, then from config file, then defaults
nconf.argv({
  "p": {
    "alias": "http:port",
    "describe": "The port to listen on"
  }
});
nconf.file("serverConfig.json");
//setup some defaults
nconf.defaults({
  "http": {
    "port": 3000
  }
});

//set up a log file for winston logging messages
//Winston logging levels:
//silly() -- debug() -- verbose() -- info() -- warn() -- error()
const winstonErrorLog = "qvError.log"
winston.add(winston.transports.File, {"filename": winstonErrorLog, "level": "warn"});
winston.info(`Logging messages to ${winstonErrorLog}`)

app.set('port', (process.env.PORT || nconf.get('http:port')));

app.use('/', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const apiRouter = require('./api_routes');

app.use('/', apiRouter);


app.listen(app.get('port'), () => {
  console.log(`Find the Util server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
