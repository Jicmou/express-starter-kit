import { TRouteDictionnary } from './router.type';
import EAPIEndPoint from './api-endpoint.enum';
import { helloWorldRoute } from '../root/hello-world.route';

export const routeDictionnary: TRouteDictionnary = {
  [EAPIEndPoint.ROOT]: helloWorldRoute,
};
