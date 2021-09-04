import Express from 'express';
import HealthCheckController from './controller/HealthCheckController';

const router = Express.Router();

router.use('/', HealthCheckController);

export default router;