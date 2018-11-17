import tape from 'tape';

import EAPIEndPoint from './api-endpoint.enum';
import EAPIPath from './api-path.enum';
import EExpressRequestMethod from './request-method.enum';

import { IExpress } from '../deps.type';
import { IRoute, TRouteDictionnary } from './router.type';

import EXPRESS_APP_STUB from '../testing/express.mock';

import * as testedModule from './router';

tape(
  `router.ts setRoute()
  GIVEN a express app
  AND a route with GET method`,
  (test: tape.Test) => {
    const mockExpressApp: IExpress = {
      ...EXPRESS_APP_STUB,
      get: () => {
        test.pass('SHOULD register the route with GET method');
        test.end();
      },
    };
    const mockRoute: IRoute = {
      handlerList: [],
      path: EAPIPath.ROOT,
      requestMethod: EExpressRequestMethod.GET,
    };
    testedModule.setRoute(mockExpressApp)(mockRoute);
  },
);

tape(
  `router.ts setRouteMapper()
  GIVEN a express app
  AND a route dictionnary with a route with GET method`,
  (test: tape.Test) => {
    const mockExpressApp: IExpress = {
      ...EXPRESS_APP_STUB,
      get: () => {
        test.pass('SHOULD register the route with GET method');
        test.end();
      },
    };
    const mockRoute: IRoute = {
      handlerList: [],
      path: EAPIPath.ROOT,
      requestMethod: EExpressRequestMethod.GET,
    };
    const mockRouteDictionnary: TRouteDictionnary = {
      [EAPIEndPoint.ROOT]: mockRoute,
    };
    testedModule.setRouteMapper(mockExpressApp)(mockRouteDictionnary);
  },
);
