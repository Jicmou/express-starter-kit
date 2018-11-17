import * as fsUtils from '../utils/fs';

export const mockReadFileErrorFactory: (
  error: NodeJS.ErrnoException,
) => fsUtils.FsReadFile = (error: NodeJS.ErrnoException) => (
  _path: string,
  _options: { encoding: string; flag?: string },
  callBack: fsUtils.FsReadFileCallBack,
) => {
  callBack(error, undefined);
};

export const mockReadFileSuccessFactory: (
  fileContent: string,
) => fsUtils.FsReadFile = (fileContent: string) => (
  _path: string,
  _options: { encoding: string; flag?: string },
  callBack: fsUtils.FsReadFileCallBack,
) => {
  callBack(undefined, fileContent);
};
