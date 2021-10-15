const schedule = require('node-schedule');
const { configSettings } = require('./config/settings');
import { Connection, createConnection } from 'typeorm';

var mysql!: Connection;

const job = schedule.scheduleJob('1 * * * * *', async function(){
  
  console.log('The answer to life, the universe, and everything!');
});