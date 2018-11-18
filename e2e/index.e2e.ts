import tape from 'tape';

import { HELLO_WORLD } from '../src/root/hello-world';
import { runE2ETest, MAIN_ARGS } from './test-wrapper';
import { getPromisified } from './request-utils';
import { getConfig, IGetConfigDeps } from '../src/config/config';

const CONFIG_DEPS: IGetConfigDeps = {
  path: MAIN_ARGS.path,
  process: MAIN_ARGS.process,
  readFile: MAIN_ARGS.readFile,
};

const getServerUrlFromConfig = (configDeps: IGetConfigDeps) =>
  getConfig(configDeps).then(config => `http://${config.host}:${config.port}/`);

tape(`Server launches: `, (t: tape.Test) =>
  runE2ETest(t)(test => {
    test.pass('main SHOULD sucessfully resolve');
    return test.end();
  }),
);

tape(`Hello, world! endpoint ("/"): `, (t: tape.Test) =>
  runE2ETest(t)(test =>
    getServerUrlFromConfig(CONFIG_DEPS).then(uri =>
      getPromisified({ uri }).then(response => {
        test.equals(response.body, HELLO_WORLD, `SHOULD return ${HELLO_WORLD}`);
        test.equals(response.statusCode, 200, `status code SHOULD be 200`);
        return test.end();
      }),
    ),
  ),
);
