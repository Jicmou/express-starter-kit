import * as types from './deps.type';
import { getConfig } from './config';
import { startServer } from './server';

export interface IMainDeps {
  express: types.IExpress;
  logger: types.Logger;
  process: types.Process;
  readFile: types.ReadFile;
}

interface IExitDeps {
  logger: types.IErrorLogger;
  process: types.IProcessExit;
}

const exitWithFatalError = (deps: IExitDeps) => (error: any) => {
  deps.logger.error('FATAL ERROR: ', error);
  return deps.process.exit(1);
};

export const main = ({ express, logger, process, readFile }: IMainDeps) =>
  getConfig({ process, readFile })
    .then(startServer({ express, logger }))
    .catch(exitWithFatalError({ logger, process }));
