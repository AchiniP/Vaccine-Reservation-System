import Express from 'express';
import { StatusCodes } from 'http-status-codes';
import validation from 'express-joi-validation';
import Joi from 'joi';
import Logger from '../config/logger';
import UserVaccineStatusService from '../service/UserVaccineStatusService';

const UserVaccineStatusController = Express.Router();
const LOG = new Logger('UserVaccineStatusController.js');
const validator = validation.createValidator({ passError: true });

const FETCH_USER_VACCINE_STATUS_SCHEMA = Joi.object().keys({
  userId: Joi.string().required(),
});

export const USER_VACCINE_RESERVATION_SCHEMA = Joi.object().keys({
  vaccineSlotId: Joi.number().positive().required(true),
  status: Joi.string().valid('PENDING'),
});

const REMOVE_USER_VACCINE_STATUS_SCHEMA = Joi.object().keys({
  vaccineSlotId: Joi.number().positive().required(true)
});

const getUserVaccineStatusHandler = async (req, res, next) => {
  const { userId } = req.params;
  LOG.info(`[ROUTER][USER]: request recieved for retrieve user vaccine status: ${userId}`);
  return UserVaccineStatusService.getUserVaccineStatusByUserId(userId)
    .then(result => res.status(StatusCodes.OK).send(result))
    .catch(error => {
      LOG.error(`[ROUTER][ADMIN]: error occurred while retrieving data: ${error.message}`);
      return next(error)
    })
}

const saveUserVaccineStatus = async (req, res, next) => {
  const { userId } = req.params;
  const { vaccineSlotId, status} = req.body;
  LOG.info(`[ROUTER][USER]: request recieved for save user vaccine status: ${userId} - vaccineSlot: ${vaccineSlotId} - status: ${status}`);
  return UserVaccineStatusService.saveUserVaccinseStatusByUserId(userId, vaccineSlotId, status)
    .then(result => res.status(StatusCodes.CREATED).send(result))
    .catch(error => {
      LOG.error(`[ROUTER][ADMIN]: error occurred while saving data: ${error.message}`);
      return next(error)
    })
}

const cancelUserVaccine = async (req, res, next) => {
  const { userId } = req.params;
  const { vaccineSlotId } = req.query;
  LOG.info(`[ROUTER][USER]: request recieved for remove user vaccine entry: ${userId} - vaccineSlot: ${vaccineSlotId}`);
  return UserVaccineStatusService.deleteVaccineStatusByUserId(userId, vaccineSlotId)
    .then(result => res.sendStatus(StatusCodes.OK))
    .catch(error => {
      LOG.error(`[ROUTER][ADMIN]: error occurred while removing data: ${error.message}`);
      return next(error)
    })
}


UserVaccineStatusController.get('/:userId/vaccineStatus', validator.params(FETCH_USER_VACCINE_STATUS_SCHEMA), getUserVaccineStatusHandler);

UserVaccineStatusController.post('/:userId/vaccineStatus', validator.body(USER_VACCINE_RESERVATION_SCHEMA), saveUserVaccineStatus);

UserVaccineStatusController.delete('/:userId/vaccineStatus', validator.query(REMOVE_USER_VACCINE_STATUS_SCHEMA), cancelUserVaccine);

  
export default UserVaccineStatusController;