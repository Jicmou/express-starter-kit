import { Server } from 'http';
import * as configModule from './config';
import { startServer } from './server';

type ProcessArgv = string[];
type ProcessExit = (code?: number) => never;
type ProcessCwd = () => string;

interface IProcess {
  argv: ProcessArgv;
  exit: ProcessExit;
  cwd: ProcessCwd;
}

export interface ILogger {
  error: (...error: any[]) => void;
  log: (...message: any[]) => void;
}

export interface IServer {
  listen(
    port: number,
    hostname: string,
    callback?: (error: any) => void,
  ): Server;
}

export interface IMainDeps {
  logger: ILogger;
  server: IServer;
  process: IProcess;
}

const getConfig = (process: IProcess) =>
  configModule.getConfigFromJSONFile(
    configModule.getAbsoluteConfigPath(process.cwd())(
      configModule.getConfigFilePathFormArgv(process.argv),
    ),
  );

const exitWithFatalError = (deps: IMainDeps) => (error: any) => {
  deps.logger.error('FATAL ERROR: ', error);
  return deps.process.exit(1);
};

export const main = (deps: IMainDeps) =>
  getConfig(deps.process)
    .then(startServer(deps))
    .catch(exitWithFatalError(deps));
