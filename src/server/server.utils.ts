import { AddressInfo } from 'net';

import { ILogLogger, IServerAddress } from '../deps.type';

export const getServerAdressAsString = (server: IServerAddress) => {
  const serverAddress = server.address();
  return `http://${(serverAddress as AddressInfo).address}:${
    (serverAddress as AddressInfo).port
  }/`;
};

export const logSuccessListening = (logger: ILogLogger) => (
  server: IServerAddress,
) => {
  logger.log(`server listening on ${getServerAdressAsString(server)}`);
};
