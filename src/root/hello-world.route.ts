import EAPIPath from '../router/api-path.enum';
import EExpressRequestMethod from '../router/request-method.enum';
import { IRoute } from './../router/router.type';
import { greetWorld } from './hello-world';

export const helloWorldRoute: IRoute = {
  handlerList: [greetWorld],
  path: EAPIPath.ROOT,
  requestMethod: EExpressRequestMethod.GET,
};
