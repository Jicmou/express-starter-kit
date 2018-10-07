import { AddressInfo } from 'net';
import { ILogLogger } from '../deps.type';

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

export const logSuccessListening = (logger: ILogLogger) => (server: {
  address: () => AddressInfo | string;
}) => {
  logger.log(`server listening on ${getServerAdressAsString(server)}`);
};
