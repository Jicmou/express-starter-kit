import tape from 'tape';
import { AddressInfo } from 'net';

import { ILogLogger, IServerAddress } from '../deps.type';

import * as testedModule from './server.utils';

tape(
  `server.utils.ts getServerAdressAsString()
  GIVEN an address as adressInfo object`,
  (test: tape.Test) => {
    const mockAddressInfo: AddressInfo = {
      address: '127.0.0.1',
      family: 'ipv4',
      port: 3000,
    };
    test.equals(
      testedModule.getServerAdressAsString({
        address: () => mockAddressInfo,
      }),
      `http://${mockAddressInfo.address}:${mockAddressInfo.port}/`,
      'THEN it SHOULD return the server address as string',
    );
    test.end();
  },
);

tape(
  `server.utils.ts logSuccessListening()
  GIVEN an address as a string`,
  (test: tape.Test) => {
    const mockLog: ILogLogger = {
      log: () => {
        test.pass('THEN it SHOULD log a success message');
        test.end();
      },
    };
    const mockAddressInfo: AddressInfo = {
      address: '127.0.0.1',
      family: 'ipv4',
      port: 3000,
    };
    const mockAddress: IServerAddress = {
      address: () => mockAddressInfo,
    };
    testedModule.logSuccessListening(mockLog)(mockAddress);
  },
);
