const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const AWS = require('aws-sdk');
require('dotenv').config();

const app = express();

AWS.config.update({
  region: process.env.AWS_REGION, 
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

app.use(cors());      
app.use(helmet());      
app.use(morgan('common')); 
app.use(express.json());  


const routes = require('../../routers/router');

app.use('/api', routes);

module.exports = app;