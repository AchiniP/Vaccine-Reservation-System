
import { StatusCodes } from 'http-status-codes';
import sequelize from '../config/database';
import Logger from '../config/logger';
import ErrorMiddleware from '../middleware/ErrorMiddleware';
import ErrorCodes from '../const/ErrorCodes';
import ErrorMessages from '../const/ErrorMessages';
import { FETCH_USER_VACCINE_DETAILS, FETCH_VACCINE_CENTER_AVAILABILITY, FETCH_VACCINE_CENTER_DATA_BY_AVAILABILITY_ID } from './Query';

const LOG = new Logger('Transactions.js');

const bulkInsertData = async (model, insertData, updateOnDuplicate = false) => {
  LOG.info('[REPOSITORY] Going to insert bulk data to ', model);
  const modelToConnect = sequelize.models[model];
  try {
    updateOnDuplicate ? await modelToConnect.bulkCreate(insertData, { updateOnDuplicate: updateOnDuplicate }) 
      :
      await modelToConnect.bulkCreate(insertData);
  }
  catch (error) {
    LOG.error(`[REPOSITORY] Error occurred in inserting details for ${model}`, error);
    throw new ErrorMiddleware(ErrorMessages.BULK_INSERT_ERROR, ErrorCodes.DB_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
 
}

const bulkInsertDataByColumns = async (model, insertData, fields, updateOnDuplicate = false, returning = false) => {
  LOG.info(`[REPOSITORY] Going to insert bulk data to ${model}`);
  const modelToConnect = sequelize.models[model];
  try {
    const result = updateOnDuplicate ? await modelToConnect.bulkCreate(insertData, { fields, updateOnDuplicate })
      :
      await modelToConnect.bulkCreate(insertData, {fields, returning});
    return result;
  }
  catch (error) {
    LOG.error(`[REPOSITORY] Error occurred in inserting details for ${model}`, error);
    throw new ErrorMiddleware(ErrorMessages.BULK_INSERT_ERROR, ErrorCodes.DB_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
   
}

const findByCondition = async (model,  condition) => {
  LOG.info(`[REPOSITORY] Going to search data from ${model} on ${condition}`);
  const modelToConnect = sequelize.models[model];
  try {
    const record = await modelToConnect.findOne({ where: condition });
    return record;
  } catch(error) {
    LOG.error(`[REPOSITORY] Error occurred in fetch details from ${model}`, error);
    throw new ErrorMiddleware(ErrorCodes.DB_ERROR, ErrorMessages.DB_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

const updateByCondition = async (model, column, condition) => {
  LOG.info(`[REPOSITORY] Going to update data in ${model} on ${JSON.stringify(column)}`);
  const modelToConnect = sequelize.models[model];
  const record = await modelToConnect.update(column, { where: condition });
  return record;
}

const findAll = async (model) => {
  LOG.info(`[REPOSITORY] Going to fetch all data from ${model}`);
  const modelToConnect = sequelize.models[model];
  try {
    const data = await modelToConnect.findAll();
    return data;
  } catch (error) {
    LOG.error(`[REPOSITORY] Error occurred in fetch all details from ${model}`, error);
    throw new ErrorMiddleware(ErrorCodes.DB_ERROR, ErrorMessages.DB_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

const findAllByCondition = async (model, condition) => {
  LOG.info(`[REPOSITORY] Going to fetch all data from ${model}`);
  const modelToConnect = sequelize.models[model];
  try {
    const data = await modelToConnect.findAll({ where: condition});
    return data;
  } catch (error) {
    LOG.error(`[REPOSITORY] Error occurred in fetch all details from ${model}`, error);
    throw new ErrorMiddleware(ErrorCodes.DB_ERROR, ErrorMessages.DB_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

const bulkDeleteData = async (model, deleteData) => {
  LOG.info(`[REPOSITORY] Going to bulk delete data from ${model}`);
  await deleteData.forEach(async (row) => {
    const rowToDelete = await findByCondition(model, row);
    if(rowToDelete) {
      rowToDelete.destroy();
    } else {
      LOG.info(`[REPOSITORY] Record Not found for deletion: ${row}`);
    }
  })
}

const fetchVaccineCenterAvailability = async (vaccineCenterId) => {
  LOG.info(`[REPOSITORY] Going to fetch vaccine center availability for: ${vaccineCenterId}`);
  try { 
    const vaccineCenterAvailabilityDetails = await sequelize.query(FETCH_VACCINE_CENTER_AVAILABILITY,
      { replacements: { vaccineCenterId }, type: sequelize.QueryTypes.SELECT });
    return vaccineCenterAvailabilityDetails;
  } catch (error) {
    LOG.error('[REPOSITORY] Error occurred in fetch vaccine availability', error);
    throw new ErrorMiddleware(ErrorCodes.DB_ERROR, ErrorMessages.DB_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

const fetchUserVaccineDetails = async (nic) => {
  LOG.info(`[REPOSITORY] Going to fetch vaccine booking status for: ${nic}`);
  try { 
    const vaccineBookingStatus = await sequelize.query(FETCH_USER_VACCINE_DETAILS,
      { replacements: { nic }, type: sequelize.QueryTypes.SELECT });
    return vaccineBookingStatus;
  } catch (error) {
    LOG.error('[REPOSITORY] Error occurred in fetch vaccine availability', error);
    throw new ErrorMiddleware(ErrorCodes.DB_ERROR, ErrorMessages.DB_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

const fetchVaccineCenterAvailabilityByAvailabilityId = async (availabilityId) => {
  LOG.info(`[REPOSITORY] Going to fetch vaccine center availability for: ${availabilityId}`);
  try { 
    const vaccineCenterAvailabilityDetails = await sequelize.query(FETCH_VACCINE_CENTER_DATA_BY_AVAILABILITY_ID,
      { replacements: { availabilityId }, type: sequelize.QueryTypes.SELECT });
    return vaccineCenterAvailabilityDetails;
  } catch (error) {
    LOG.error('[REPOSITORY] Error occurred in fetch vaccine availability', error);
    throw new ErrorMiddleware(ErrorCodes.DB_ERROR, ErrorMessages.DB_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
  


export default {
  bulkInsertData,
  findByCondition,
  bulkDeleteData,
  findAll,
  updateByCondition,
  bulkInsertDataByColumns,
  findAllByCondition,
  fetchVaccineCenterAvailability,
  fetchUserVaccineDetails,
  fetchVaccineCenterAvailabilityByAvailabilityId,
};