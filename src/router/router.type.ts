import { RequestHandler } from 'express';

import EExpressRequestMethod from './request-method.enum';
import EAPIEndpoint from './api-endpoint.enum';
import EAPIPath from './api-path.enum';

export interface IRoute {
  handlerList: RequestHandler[];
  path: EAPIPath;
  requestMethod: EExpressRequestMethod;
}

export type TRouteDictionnary = { [key in EAPIEndpoint]: IRoute };
