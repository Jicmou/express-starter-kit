import { AddressInfo } from 'net';
import { IConfig } from './config';
import { ILogger, IServer, IMainDeps } from './main';
import { Server } from 'http';

interface ICreateServerDeps {
  logger: ILogger;
  server: IServer;
}

export const createServer = (deps: ICreateServerDeps) => ({
  port,
  host,
}: IConfig) => {
  return new Promise<Server>((resolve, reject) => {
    const server = deps.server.listen(port, host, (error: any) => {
      if (error) {
        deps.logger.error('AN ERROR OCCURED', error);
        reject(new Error(error));
      }
      resolve(server);
    });
  });
};

const getServerAdressAsString = (server: {
  address: () => AddressInfo | string;
}) => {
  const serverAdress = server.address();
  return (serverAdress as AddressInfo).address
    ? `http://${(serverAdress as AddressInfo).address}:${
        (serverAdress as AddressInfo).port
      }/`
    : (serverAdress as string);
};

const logSuccessListening = (logger: ILogger) => (server: {
  address: () => AddressInfo | string;
}) => {
  logger.log(`server listening on ${getServerAdressAsString(server)}`);
};

export const startServer = (deps: IMainDeps) => (config: IConfig) =>
  createServer(deps)(config).then(logSuccessListening(deps.logger));
