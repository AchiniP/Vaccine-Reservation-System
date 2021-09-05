import Express from 'express';
import { StatusCodes } from 'http-status-codes';
import VaccineCenterService from '../service/VaccineCenterService';
import VaccineCenterAvailabilityService from '../service/VaccineCenterAvailabilityService';
import Logger from '../config/logger';


const VaccinationCenterController = Express.Router();
const LOG = new Logger('VaccinationCenterController.js');


const getVaccineCenterListHandler = async (req, res, next) => {
  LOG.info('[ROUTER][USER]: request recieved for retrieve vaccine center list');
  return VaccineCenterService.getVaccineCenterList()
    .then(result => res.status(StatusCodes.OK).send(result))
    .catch(error => {
      LOG.error(`[ROUTER][USER]: error occurred while retrieving vaccine center list data: ${error.message}`);
      return next(error)
    })
}

const getVaccineCenterAvailabilityHandler = async (req, res, next) => {
  LOG.info('[ROUTER][USER]: request recieved for retrieve vaccine center list'); 
  const { vaccineCenterId } = req.query;
  return VaccineCenterAvailabilityService.getVaccineCenterAvailability(vaccineCenterId)
    .then(result => res.status(StatusCodes.OK).send(result))
    .catch(error => {
      LOG.error(`[ROUTER][USER]: error occurred while retrieving vaccine center availability data: ${error.message}`);
      return next(error)
    })
}


VaccinationCenterController.get('/', getVaccineCenterListHandler);

VaccinationCenterController.get('/availability', getVaccineCenterAvailabilityHandler);

  
export default VaccinationCenterController;