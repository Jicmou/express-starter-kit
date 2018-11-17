import tape from 'tape';

import * as testedModule from './fs';

const mockError: NodeJS.ErrnoException = {
  message: 'foo',
  name: 'bar',
};

const mockReadFileError: testedModule.FsReadFile = (
  _path: string,
  _options: { encoding: string; flag?: string },
  callBack: testedModule.FsReadFileCallBack,
) => {
  callBack(
    {
      message: 'foo',
      name: 'bar',
    },
    undefined,
  );
};

const mockFileContent = 'foo';

const mockReadFileSuccess: testedModule.FsReadFile = (
  _path: string,
  _options: { encoding: string; flag?: string },
  callBack: testedModule.FsReadFileCallBack,
) => {
  callBack(undefined, mockFileContent);
};

tape(
  `fs.ts: readFile()
  GIVEN a wrong path`,
  (test: tape.Test) => {
    return testedModule
      .readFile({ readFile: mockReadFileError })('foo')
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
  `fs.ts: readFile()
  GIVEN a valid path`,
  (test: tape.Test) => {
    return testedModule
      .readFile({ readFile: mockReadFileSuccess })('foo')
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
