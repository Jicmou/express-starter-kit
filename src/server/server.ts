import { Server } from 'http';

import { IConfig } from '../config/config';
import { ILogLogger, IExpress } from '../deps.type';
import { logSuccessListening } from './server.utils';
import { setRouteMapper } from '../router/router';
import { routeDictionnary } from '../router/route-dictionnary';

interface IStartServerDeps {
  express: IExpress;
  logger: ILogLogger;
}

export const createServer = (express: IExpress) => ({
  port,
  host,
}: IConfig) => {
  setRouteMapper(express)(routeDictionnary);
  return new Promise<Server>(resolve => {
    const httpServer = express.listen(port, host, () => resolve(httpServer));
  });
};

export const startServer = ({ express, logger }: IStartServerDeps) => (
  config: IConfig,
) =>
  createServer(express)(config).then(server => {
    logSuccessListening(logger)(server as any);
    return server;
  });
