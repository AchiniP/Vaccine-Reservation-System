import { StatusCodes } from 'http-status-codes';
import DBConnecterRepository from '../repository/Transactions';
import Logger from '../config/logger';
import  { CLASS_NAMES } from '../const/globalConstant';
import ErrorMiddleware from '../middleware/ErrorMiddleware';
import ErrorCodes from '../const/ErrorCodes';
import ErrorMessages from '../const/ErrorMessages';


const LOG = new Logger('UserVaccineStatusService.js');

const getUserVaccineStatusByUserId = async (userKey) => {
  LOG.info(`[SERVICE][USER]: request recieved for retrieve vaccine details for ${userKey}`); 
  const userVaccineStatusDetails =  await DBConnecterRepository.findAllByCondition(CLASS_NAMES.USER_VACCINE_STATUS, { nic: userKey });
  return userVaccineStatusDetails;
}

const saveUserVaccinseStatusByUserId = async (userKey, vaccineSlotId, status, selectedDate, isUpdate=false) => {
  LOG.info(`[SERVICE][USER]: request recieved for save vaccine details for ${userKey}`); 
  const userData = [
    {
      nic: userKey,
      vaccineSlotId,
      status,
      selectedDate
    }
  ]
  const userVaccineStatusDetails =  await DBConnecterRepository.findAllByCondition(CLASS_NAMES.USER_VACCINE_STATUS, { nic: userKey });
  if (!isUpdate && userVaccineStatusDetails.length > 0) {
    throw new ErrorMiddleware(ErrorCodes.VALIDATION_ERROR, ErrorMessages.USER_ALREADY_HAS_A_BOOKING, StatusCodes.BAD_REQUEST);
  }
  const result = await DBConnecterRepository.bulkInsertDataByColumns(CLASS_NAMES.USER_VACCINE_STATUS, userData, ['nic', 'vaccineSlotId', 'status', 'selectedDate'], ['vaccineSlotId', 'status', 'selectedDate']);
  return result;
}

const deleteVaccineStatusByUserId =  async (userKey, vaccineSlotId) => {
  LOG.info(`[SERVICE][USER]: request recieved for delete vaccine details for ${userKey} - vaccineSlot-${vaccineSlotId}`); 
  const userData = [
    {
      nic: userKey,
      vaccineSlotId,
    }
  ]
  await DBConnecterRepository.bulkDeleteData(CLASS_NAMES.USER_VACCINE_STATUS, userData);
}

export default {
  getUserVaccineStatusByUserId,
  saveUserVaccinseStatusByUserId,
  deleteVaccineStatusByUserId
};
