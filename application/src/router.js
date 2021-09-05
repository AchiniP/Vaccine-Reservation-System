import Express from 'express';
import HealthCheckController from './controller/HealthCheckController';
import UserVaccineStatusController from './controller/UserVaccineStatusController';
import DataImportController from './controller/DataImportController';
import VaccinationCenterController from './controller/VaccinationCenterController';

const router = Express.Router();

router.use('/', HealthCheckController);
router.use('/user', UserVaccineStatusController);
router.use('/', DataImportController);
router.use('/vaccineCenter', VaccinationCenterController);

export default router;