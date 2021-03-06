import Sequelize from 'sequelize';
import Logger from './logger';

const LOG = new Logger('database.js');
const {
  DB_HOST = '192.168.99.100',
  DB_PORT = '3306',
  DB_SCHEMA = 'covid-reservation-system',
  DB_USER = 'root',
  DB_PW = 'password',
  DB_POOL_ACQUIRE = '30000',
  DB_POOL_IDLE = '10000',
  DB_POOL_MAX_CONN = '10',
  DB_POOL_MIN_CONN = '1',
  DB_LOG_LEVEL = 'info',
} = process.env

const sequelize = new Sequelize(DB_SCHEMA, DB_USER, DB_PW, {
  dialect: 'mysql',
  host: DB_HOST,
  port: parseInt(DB_PORT),
  pool: {
    acquire: parseInt(DB_POOL_ACQUIRE),
    idle: parseInt(DB_POOL_IDLE),
    max: parseInt(DB_POOL_MAX_CONN),
    min: parseInt(DB_POOL_MIN_CONN)
  },
  timezone: '+08:00',
  logging: (msg) => {
    LOG[DB_LOG_LEVEL](msg);
  }
});


const modelDefiners = [
  require('../model/VaccineCenter.model'),
  require('../model/Timeslot.model'),
  require('../model/VaccineCenterAvailability.model'),
  require('../model/UserVaccineStatus.model'),

];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

export default sequelize;

