import DBConnecterRepository from '../repository/Transactions';
import Logger from '../config/logger';
import  { CLASS_NAMES } from '../const/globalConstant'


const LOG = new Logger('UserVaccineStatusService.js');

const getUserVaccineStatusByUserId = async (userKey) => {
  LOG.info(`[SERVICE][USER]: request recieved for retrieve vaccine details for ${userKey}`); 
  const userVaccineStatusDetails = await DBConnecterRepository.findAllByCondition(CLASS_NAMES.USER_VACCINE_STATUS, { nic: userKey });
  return userVaccineStatusDetails;
}

const saveUserVaccinseStatusByUserId = async (userKey, vaccineSlotId, status) => {
  LOG.info(`[SERVICE][USER]: request recieved for save vaccine details for ${userKey}`); 
  const userData = [
    {
      nic: userKey,
      vaccineSlotId,
      status  
    }
  ]
  const result = await DBConnecterRepository.bulkInsertDataByColumns(CLASS_NAMES.USER_VACCINE_STATUS, userData, ['nic', 'vaccineSlotId', 'status'], ['vaccineSlotId', 'status']);
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
