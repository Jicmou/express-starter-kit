import tape from 'tape';

import { Process } from '../deps.type';
import FUNCTION_STUB from '../testing/function.stub';
import EXPRESS_APP_STUB from '../testing/express.mock';
import { LOGGER_STUB } from '../testing/logger.stub';

import * as testedModule from './main';

tape(
  `main.ts main():
GIVEN a process with an empty argv list`,
  (test: tape.Test) => {
    const mockProcess: Process = {
      argv: [],
      cwd: () => '/foo',
      exit: (code?: number) => {
        test.equals(code, 1, 'SHOULD exit with code 1 properly');
        return test.end() as never;
      },
    };
    testedModule.main({
      express: EXPRESS_APP_STUB,
      logger: LOGGER_STUB,
      path: {
        isAbsolute: FUNCTION_STUB as any,
        join: FUNCTION_STUB as any,
      },
      process: mockProcess,
      readFile: FUNCTION_STUB as any,
    });
  },
);
