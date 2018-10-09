import * as types from './deps.type';
import { ReadFile } from './utils/fs';
import { getConfig } from './config/config';
import { startServer } from './server/server';

export interface IMainDeps {
  express: types.IExpress;
  logger: types.Logger;
  process: types.Process;
  readFile: ReadFile;
  path: types.IPath;
}

interface IExitDeps {
  logger: types.IErrorLogger;
  process: types.IProcessExit;
}

const exitWithFatalError = (deps: IExitDeps) => (error: any) => {
  deps.logger.error('FATAL ERROR: ', error);
  return deps.process.exit(1);
};

export const main = ({ express, logger, path, process, readFile }: IMainDeps) =>
  getConfig({ path, process, readFile })
    .then(startServer({ express, logger }))
    .catch(exitWithFatalError({ logger, process }));
