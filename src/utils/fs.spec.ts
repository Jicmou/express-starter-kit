import tape from 'tape';

import {
  mockReadFileErrorFactory,
  mockReadFileSuccessFactory,
} from '../testing/readFile.mock';

import * as testedModule from './fs';

tape(
  `fs.ts: readFileFactory()
  GIVEN a wrong path`,
  (test: tape.Test) => {
    const mockError: NodeJS.ErrnoException = {
      message: 'foo',
      name: 'bar',
    };
    return testedModule
      .readFileFactory(mockReadFileErrorFactory(mockError))('foo')
      .catch((error: NodeJS.ErrnoException) => {
        test.deepEquals(
          error,
          mockError,
          'THEN it SHOULD eventually reject the Error From the readFile dependency',
        );
        test.end();
      });
  },
);

tape(
  `fs.ts: readFileFactory()
  GIVEN a valid path`,
  (test: tape.Test) => {
    const mockFileContent = 'foo';
    return testedModule
      .readFileFactory(mockReadFileSuccessFactory(mockFileContent))('foo')
      .then((fileContent: string) => {
        test.equals(
          fileContent,
          mockFileContent,
          'THEN it SHOULD eventually return the file content',
        );
        test.end();
      });
  },
);
