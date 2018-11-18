import * as types from './router.type';
import EAPIEndPoint from './api-endpoint.enum';
import { IExpress } from '../deps.type';

export const setRoute = (server: IExpress) => (route: types.IRoute) =>
  server[route.requestMethod](route.path, ...route.handlerList);

export const setRouteMapper = (server: IExpress) => (
  routeDictionnary: types.TRouteDictionnary,
) =>
  (Object.keys(routeDictionnary) as EAPIEndPoint[]).map(endpoint =>
    setRoute(server)(routeDictionnary[endpoint]),
  );
