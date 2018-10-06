import tape from 'tape';
import * as testedModule from './config';

tape(
  `
  config.ts:
  getConfigFilePathFormArgv(),
  GIVEN a list of arguments,
  AND no --config flag in that list
`,
  (test: tape.Test) => {
    const argv: testedModule.Argv = ['foo', 'bar'];
    test.throws(
      () => testedModule.getConfigFilePathFormArgv(argv),
      'THEN it SHOULD throw an error',
    );
    test.end();
  },
);

tape(
  `
  config.ts:
  getConfigFilePathFormArgv(),
  GIVEN a list of arguments,
  AND a --config flag in that list
  AND no value for that flag
`,
  (test: tape.Test) => {
    const argv: testedModule.Argv = ['foo', 'bar', '--config'];
    test.throws(
      () => testedModule.getConfigFilePathFormArgv(argv),
      'THEN it SHOULD throw an error',
    );
    test.end();
  },
);

tape(
  `
  config.ts:
  getConfigFilePathFormArgv(),
  GIVEN a list of arguments,
  AND a --config flag in that list
  AND an invalid value for that flag
`,
  (test: tape.Test) => {
    const argv: testedModule.Argv = ['foo', 'bar', '--config', 'foo'];
    test.throws(
      () => testedModule.getConfigFilePathFormArgv(argv),
      'THEN it SHOULD throw an error',
    );
    test.end();
  },
);

tape(
  `
  config.ts:
  getConfigFilePathFormArgv(),
  GIVEN a list of arguments,
  AND a --config flag in that list
  AND a valid value for that flag
`,
  (test: tape.Test) => {
    const validValue = 'foo.json';
    const argv: testedModule.Argv = ['foo', 'bar', '--config', validValue];
    test.equals(
      testedModule.getConfigFilePathFormArgv(argv),
      validValue,
      'THEN it SHOULD return the GIVEN file path',
    );
    test.end();
  },
);

tape(
  `
  config.ts:
  getConfigFilePathFormArgv(),
  GIVEN a list of arguments,
  AND 2 --config flags in that list
  AND a valid value for each flag
`,
  (test: tape.Test) => {
    const validValue = 'foo.json';
    const argv: testedModule.Argv = [
      'foo',
      'bar',
      '--config',
      validValue,
      '--config',
      validValue,
    ];
    test.throws(
      () => testedModule.getConfigFilePathFormArgv(argv),
      'THEN it SHOULD throw an error',
    );
    test.end();
  },
);
