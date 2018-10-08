import tape from 'tape';
import path from 'path';

import * as testedModule from './config';

tape(
  `config.ts: getConfigFilePathFormArgv(),
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
  `config.ts: getConfigFilePathFormArgv(),
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
  `config.ts: getConfigFilePathFormArgv(),
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
  `config.ts: getConfigFilePathFormArgv(),
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
  `config.ts: getConfigFilePathFormArgv(),
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

tape(
  `config.ts: getAbsoluteConfigPath(),
  GIVEN an absolute directory path
  AND an empty string as file path
`,
  (test: tape.Test) => {
    test.throws(
      () => testedModule.getAbsoluteConfigPath(path)('/foo')(''),
      'THEN it SHOULD throw an error',
    );
    test.end();
  },
);

tape(
  `config.ts: getAbsoluteConfigPath(),
  GIVEN an absolute directory path
  AND an absolute file path
`,
  (test: tape.Test) => {
    test.equals(
      testedModule.getAbsoluteConfigPath(path)('/foo')('/bar/baz.json'),
      '/bar/baz.json',
      'THEN it SHOULD return the absolute file path as is.',
    );
    test.end();
  },
);

tape(
  `config.ts: getAbsoluteConfigPath(),
  GIVEN an absolute directory path
  AND a file name
`,
  (test: tape.Test) => {
    test.equals(
      testedModule.getAbsoluteConfigPath(path)('/foo')('baz.json'),
      '/foo/baz.json',
      'THEN it SHOULD join the directory path with the file name.',
    );
    test.end();
  },
);

tape(
  `config.ts: getAbsoluteConfigPath(),
  GIVEN a relative directory path
  AND a file name
`,
  (test: tape.Test) => {
    test.throws(
      () => testedModule.getAbsoluteConfigPath(path)('foo')('baz.json'),
      'THEN it SHOULD throw an error',
    );
    test.end();
  },
);

tape(
  `config.ts: getAbsoluteConfigPath(),
  GIVEN an absolute directory path
  AND a relative file path
`,
  (test: tape.Test) => {
    test.equals(
      testedModule.getAbsoluteConfigPath(path)('/foo/bar')('../baz.json'),
      '/foo/baz.json',
      'THEN it SHOULD join the directory path with the file name.',
    );
    test.end();
  },
);

tape(
  `config.ts: validateConfigObject(),
GIVEN an empty object
`,
  (test: tape.Test) => {
    test.throws(
      () => testedModule.validateConfigObject({}),
      'THEN it SHOULD throw an error',
    );
    test.end();
  },
);

tape(
  `config.ts: validateConfigObject(),
GIVEN a config object
AND host property is missing
`,
  (test: tape.Test) => {
    test.throws(
      () =>
        testedModule.validateConfigObject({
          port: 3000,
        }),
      'THEN it SHOULD throw an error',
    );
    test.end();
  },
);

tape(
  `config.ts: validateConfigObject(),
GIVEN a config object
AND all mandtory properties are present
`,
  (test: tape.Test) => {
    const validConfig: testedModule.IConfig = {
      host: 'foo',
      port: 3000,
    };
    test.equals(
      testedModule.validateConfigObject(validConfig),
      validConfig,
      'THEN it SHOULD return the config',
    );
    test.end();
  },
);
