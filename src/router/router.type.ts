import { RequestHandler } from 'express';

import EExpressRequestMethod from './request-method.enum';
import EAPIPath from './api-path.enum';

export interface IRoute {
  handlerList: RequestHandler[];
  path: EAPIPath;
  requestMethod: EExpressRequestMethod;
}
