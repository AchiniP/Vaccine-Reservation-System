import DBConnecterRepository from '../repository/Transactions';
import Logger from '../config/logger';
import  { CLASS_NAMES } from '../const/globalConstant'


const LOG = new Logger('VaccineCenterService.js');

const getVaccineCenterList = async () => {
  LOG.info('[SERVICE][ADMIN]: request recieved for retrieve vaccine center details'); 
  const vaccineCenterList = await DBConnecterRepository.findAll(CLASS_NAMES.VACCINE_CENTER);
  return vaccineCenterList;
}

export default {
  getVaccineCenterList
};
