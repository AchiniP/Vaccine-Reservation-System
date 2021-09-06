import moment from 'moment';
import DBConnecterRepository from '../repository/Transactions';
import Logger from '../config/logger';

const {
  MAX_SHOTS_PER_HOUR_PER_PERSON = 10,
} = process.env


const LOG = new Logger('VaccineCenterAvailabilityService.js');

const timeSlotMap = {
  1: '10.00 AM - 12.00 PM',
  2: '02.00 PM - 04.00 PM',
  3: '04.00 PM - 06.00 PM',
  4: '06.00 PM - 08.00 PM'

}

const getVaccineCenterAvailability = async (vaccineCenterId) => {
  LOG.info(`[SERVICE][USER]: request recieved for retrieve vaccine center availability details for: ${vaccineCenterId}`); 
  const vaccineCenterList = await DBConnecterRepository.fetchVaccineCenterAvailability(vaccineCenterId);
  const processedVaccineCenterList = vaccineCenterList.map( record => {
    return {
      vaccineSlotAvailabilityId: record.id,  
      vaccineCenterId: record.vaccineCenterId,
      timseSlotId: record.timseSlotId,
      timseSlotName: timeSlotMap[record.timseSlotId],
      validFrom: record.date,
      validTo: moment(record.date).startOf().add(6, 'days').format('YYYY-MM-DD HH:mm:ss'),
      currentCount: record.bookedCount,
      maxCount: MAX_SHOTS_PER_HOUR_PER_PERSON * record.count
    }
  });
  return processedVaccineCenterList;
}

const getVaccineCenterAvailabilityByAvailabilityId = async (availabilityId) => {
  LOG.info(`[SERVICE][USER]: request recieved for retrieve vaccine center availability details for: ${availabilityId}`); 
  const vaccineCenterList = await DBConnecterRepository.fetchVaccineCenterAvailabilityByAvailabilityId(availabilityId);
  const processedVaccineCenterList = vaccineCenterList.map( record => {
    return {
      vaccineSlotAvailabilityId: record.id,  
      vaccineCenterId: record.vaccineCenterId,
      timseSlotId: record.timseSlotId,
      timseSlotName: timeSlotMap[record.timseSlotId],
      validFrom: record.date,
      validTo: moment(record.date).startOf().add(6, 'days').format('YYYY-MM-DD HH:mm:ss'),
      currentCount: record.bookedCount,
      maxCount: MAX_SHOTS_PER_HOUR_PER_PERSON * record.count
    }
  });
  return processedVaccineCenterList;
}

export default {
  getVaccineCenterAvailability,
  getVaccineCenterAvailabilityByAvailabilityId
};
