import Express from 'express';
import compression from 'compression';
import cors from 'cors';
import router from './router';
import ErrorHandler from './config/ErrorHandler';

const App = Express();

App.use(compression());
App.use(cors());
App.use(Express.urlencoded({ extended: true }));
App.use(Express.json());
App.use('/api', router);
App.use(ErrorHandler);

export default App;