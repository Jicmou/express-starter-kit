import tape from 'tape';

import * as types from '../deps.type';

import * as testedModule from './config';

tape(
  `config.ts getConfigFromEnv()
  GIVEN no env variable`,
  (test: tape.Test) => {
    return testedModule.getConfigFromEnv({}).then(actualConfig => {
      test.deepEquals(
        actualConfig,
        testedModule.DEFAULT_CONFIG,
        'THEN it should return the default config',
      );
      test.end();
    });
  },
);

tape(
  `config.ts getConfigFromEnv()
  GIVEN a host AND no port`,
  (test: tape.Test) => {
    const HOST = 'foo';
    const expectedConfig = {
      ...testedModule.DEFAULT_CONFIG,
      host: HOST,
    };
    return testedModule.getConfigFromEnv({ HOST }).then(actualConfig => {
      test.deepEquals(
        actualConfig,
        expectedConfig,
        'THEN it should return the host and other defaults',
      );
      test.end();
    });
  },
);

tape(
  `config.ts getConfigFromEnv()
  GIVEN a port AND no host`,
  (test: tape.Test) => {
    const PORT = 1234;
    const expectedConfig = {
      ...testedModule.DEFAULT_CONFIG,
      port: PORT,
    };
    return testedModule.getConfigFromEnv({ PORT }).then(actualConfig => {
      test.deepEquals(
        actualConfig,
        expectedConfig,
        'THEN it should return the port and other defaults',
      );
      test.end();
    });
  },
);

tape(
  `config.ts getConfigFromEnv()
  GIVEN a port AND a host`,
  (test: tape.Test) => {
    const HOST = 'foo';
    const PORT = 1234;
    const expectedConfig = {
      ...testedModule.DEFAULT_CONFIG,
      host: HOST,
      port: PORT,
    };
    return testedModule.getConfigFromEnv({ HOST, PORT }).then(actualConfig => {
      test.deepEquals(
        actualConfig,
        expectedConfig,
        'THEN it should return the host, the port, and other defaults',
      );
      test.end();
    });
  },
);

tape(
  `config.ts: getConfig(),
  GIVEN a compete env varialbles set`,
  (test: tape.Test) => {
    const HOST = 'foo';
    const PORT = 3000;
    const env: types.IEnv = {
      HOST,
      PORT,
    };

    const mockProcess: types.IProcessEnv = {
      env,
    };

    const expectedConfig: testedModule.IConfig = {
      host: HOST,
      port: PORT,
    };

    return testedModule
      .getConfig({
        process: mockProcess,
      })
      .then(config => {
        test.deepEquals(
          config,
          expectedConfig,
          'THEN it SHOULD eventually return a config object',
        );
        test.end();
      });
  },
);
