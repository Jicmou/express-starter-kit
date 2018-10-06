import * as configModule from './config';
import { startServer } from './server';
import * as types from './deps.type';

export interface IMainDeps {
  logger: types.Logger;
  server: types.IServer;
  process: types.Process;
}

interface IExitDeps {
  logger: types.IErrorLogger;
  process: types.IProcessExit;
}

const getConfig = (process: types.Process) =>
  configModule.getConfigFromJSONFile(
    configModule.getAbsoluteConfigPath(process.cwd())(
      configModule.getConfigFilePathFormArgv(process.argv),
    ),
  );

const exitWithFatalError = (deps: IExitDeps) => (error: any) => {
  deps.logger.error('FATAL ERROR: ', error);
  return deps.process.exit(1);
};

export const main = (deps: IMainDeps) =>
  getConfig(deps.process)
    .then(startServer(deps))
    .catch(exitWithFatalError(deps));
