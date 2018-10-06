import { Server } from 'http';
import * as configModule from './config';
import { startServer } from './server';

type Argv = string[];
type Exit = (code?: number) => never;
type Cwd = () => string;

interface IProcessArgv {
  argv: Argv;
}
interface IProcessExit {
  exit: Exit;
}

interface IProcessCwd {
  cwd: Cwd;
}

type Process = IProcessArgv & IProcessCwd & IProcessExit;

type LogError = (...error: any[]) => void;
type Log = (...message: any[]) => void;

export interface IErrorLogger {
  error: LogError;
}
export interface ILogLogger {
  log: Log;
}

export type Logger = IErrorLogger & ILogLogger;

type ListenServer = (
  port: number,
  hostname: string,
  callback?: (error: any) => void,
) => Server;

export interface IServer {
  listen: ListenServer;
}

export interface IMainDeps {
  logger: Logger;
  server: IServer;
  process: Process;
}

const getConfig = (process: Process) =>
  configModule.getConfigFromJSONFile(
    configModule.getAbsoluteConfigPath(process.cwd())(
      configModule.getConfigFilePathFormArgv(process.argv),
    ),
  );

interface IExitDeps {
  logger: IErrorLogger;
  process: IProcessExit;
}

const exitWithFatalError = (deps: IExitDeps) => (error: any) => {
  deps.logger.error('FATAL ERROR: ', error);
  return deps.process.exit(1);
};

export const main = (deps: IMainDeps) =>
  getConfig(deps.process)
    .then(startServer(deps))
    .catch(exitWithFatalError(deps));
