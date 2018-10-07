import { AddressInfo } from 'net';
import { IConfig } from '../config/config';
import { Server } from 'http';
import { ILogLogger, IExpress } from '../deps.type';

export const createServer = (server: IExpress) => ({ port, host }: IConfig) => {
  return new Promise<Server>((resolve, reject) => {
    const httpServer = server.listen(port, host, (error: any) => {
      if (error) {
        reject(new Error(error));
      }
      resolve(httpServer);
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

const logSuccessListening = (logger: ILogLogger) => (server: {
  address: () => AddressInfo | string;
}) => {
  logger.log(`server listening on ${getServerAdressAsString(server)}`);
};

interface IStartServerDeps {
  express: IExpress;
  logger: ILogLogger;
}

export const startServer = ({ express, logger }: IStartServerDeps) => (
  config: IConfig,
) => createServer(express)(config).then(logSuccessListening(logger));
