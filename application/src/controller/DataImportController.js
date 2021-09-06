import Express from 'express';
import _ from 'lodash';
import { StatusCodes } from 'http-status-codes';
import Logger from '../config/logger';
import upload from '../config/Uploader';
import { convertCsvToJson } from '../utils';
import DBConnecterRepository from '../repository/Transactions';
import  { CLASS_NAMES } from '../const/globalConstant'
import ErrorMiddleware from '../middleware/ErrorMiddleware';
import ErrorCodes from '../const/ErrorCodes';
import ErrorMessages from '../const/ErrorMessages';

const DataImportController = Express.Router();
const LOG = new Logger('DataImportController.js');

const parseVaccineCenterData =  (records) => {
  const vaccineCenterDataMap = [];
  records.map((data) => {
    const { id, name } = data;
    vaccineCenterDataMap.push({ id, name });
  });
  return vaccineCenterDataMap;
}

const parseResourceAvailability =  (records) => {
  const vaccineCenterDataMap = [];
  records.map((data) => {
    const { date, vaccineCenterId, timseSlotId, count } = data;
    vaccineCenterDataMap.push({ date, vaccineCenterId, timseSlotId, count });
  });
  return vaccineCenterDataMap;
}

export const vaccineDataImportHandler = async (req, res, next) => {
  const { file } = req;

  try {
    const data = await convertCsvToJson(file.path);
    LOG.debug(JSON.stringify(data), null, 2);

    if(_.isEmpty(data)) {
      throw new ErrorMiddleware(ErrorMessages.INVALID_EXEL, ErrorCodes.MALFORMED_JSON_ERROR_CODE, StatusCodes.BAD_REQUEST);
    }
    const vaccineCenterDataMap =  parseVaccineCenterData(data);
    await DBConnecterRepository.bulkInsertData(CLASS_NAMES.VACCINE_CENTER, vaccineCenterDataMap, ['name']);
  } catch (err) {
    LOG.error(`Error Occured While Adding data ${err}`)
    return next(err);
  }
  return res.sendStatus(StatusCodes.NO_CONTENT);
}



export const resourceAvailabilityHandler = async (req, res, next) => {
  const { file } = req;
  
  try {
    const data = await convertCsvToJson(file.path);
    LOG.debug(JSON.stringify(data), null, 2);
  
    if(_.isEmpty(data)) {
      throw new ErrorMiddleware(ErrorMessages.INVALID_EXEL, ErrorCodes.MALFORMED_JSON_ERROR_CODE, StatusCodes.BAD_REQUEST);
    }
    const vaccineCenterDataMap =  parseResourceAvailability(data);
    await DBConnecterRepository.bulkInsertDataByColumns(CLASS_NAMES.VACCINE_CENTER_AVAILABILITY, vaccineCenterDataMap, ['vaccineCenterId', 'timseSlotId', 'date', 'count'], ['count']);
  } catch (err) {
    LOG.error(`Error Occured While Adding data ${err}`)
    return next(err);
  }
  return res.sendStatus(StatusCodes.NO_CONTENT);
}

DataImportController.post('/upload/vaccineCenter', upload.single('data'), vaccineDataImportHandler);
DataImportController.post('/upload/resourceAvailability', upload.single('data'), resourceAvailabilityHandler);

export default DataImportController;
