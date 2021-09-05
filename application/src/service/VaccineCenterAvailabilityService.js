import moment from 'moment';
import DBConnecterRepository from '../repository/Transactions';
import Logger from '../config/logger';
import  { CLASS_NAMES } from '../const/globalConstant'

const {
  MAX_SHOTS_PER_HOUR_PER_PERSON = 10,
} = process.env


const LOG = new Logger('VaccineCenterAvailabilityService.js');

const getVaccineCenterAvailability = async (vaccineCenterId) => {
  LOG.info(`[SERVICE][USER]: request recieved for retrieve vaccine center availability details for: ${vaccineCenterId}`); 
  const vaccineCenterList = await DBConnecterRepository.fetchVaccineCenterAvailability(vaccineCenterId);
  const processedVaccineCenterList = vaccineCenterList.map( record => {
    return {
      vaccineCenterId: record.vaccineCenterId,
      timseSlotId: record.timseSlotId,
      validFrom: record.date,
      validTo: moment(record.date).startOf().add(6, 'days').format('YYYY-MM-DD HH:mm:ss'),
      currentCount: record.bookedCount,
      maxCount: MAX_SHOTS_PER_HOUR_PER_PERSON * record.count
    }
  });
  return processedVaccineCenterList;
}

export default {
  getVaccineCenterAvailability
};
