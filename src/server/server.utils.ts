import { AddressInfo } from 'net';

import { ILogLogger, IServerAddress } from '../deps.type';

export const getServerAdressAsString = (server: IServerAddress) => {
  const serverAdress = server.address();
  return (serverAdress as AddressInfo).address
    ? `http://${(serverAdress as AddressInfo).address}:${
        (serverAdress as AddressInfo).port
      }/`
    : (serverAdress as string);
};

export const logSuccessListening = (logger: ILogLogger) => (
  server: IServerAddress,
) => {
  logger.log(`server listening on ${getServerAdressAsString(server)}`);
};
