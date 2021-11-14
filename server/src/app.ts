import * as express from 'express';
import * as cors from 'cors';
import { getPackageDependenciesTree } from './services/package.service';

/**
 * Bootstrap the application framework
 */
export function createApp() {
  const app = express();

  //options for cors midddleware
  const options: cors.CorsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: 'http://localhost:8080',
    preflightContinue: false,
  };

  app.use(cors(options));
  app.use(express.json());

  app.get('/package/:name/:version', getPackageDependenciesTree);

  return app;
}
