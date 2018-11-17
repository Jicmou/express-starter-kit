import * as Express from 'express';

import EExpressRequestMethod from './request-method.enum';
import EAPIEndPoint from './api-endpoint.enum';
import EAPIPath from './api-path.enum';

export interface IRoute {
  handlerList: Express.RequestHandler[];
  path: EAPIPath;
  requestMethod: EExpressRequestMethod;
}

export type TRouteDictionnary = { [key in EAPIEndPoint]: IRoute };

export type IRouterMatcherDictionnary = {
  [key in EExpressRequestMethod]: Express.IRouterMatcher<void>
};
