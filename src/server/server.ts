import { Server } from 'http';

import { IConfig } from '../config/config';
import { ILogLogger, IExpress } from '../deps.type';
import { logSuccessListening } from './server.utils';

interface IStartServerDeps {
  express: IExpress;
  logger: ILogLogger;
}

export const createServer = (express: IExpress) => ({
  port,
  host,
}: IConfig) => {
  return new Promise<Server>(resolve => {
    const httpServer = express.listen(port, host, () => resolve(httpServer));
  });
};

export const startServer = ({ express, logger }: IStartServerDeps) => (
  config: IConfig,
) =>
  createServer(express)(config).then(server => {
    logSuccessListening(logger)(server);
    return server;
  });
