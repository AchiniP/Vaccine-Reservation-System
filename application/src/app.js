import Express from 'express';
import compression from 'compression';
import cors from 'cors';
import router from './router';
import ErrorHandler from './config/ErrorHandler';
import swaggerUI from 'swagger-ui-express';
import swaggerDocs from '../swagger';

const App = Express();


App.use(compression());
App.use(cors());
App.use(Express.urlencoded({ extended: true }));
App.use(Express.json());
App.use('/', router);
App.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));  
App.use(ErrorHandler);

export default App;