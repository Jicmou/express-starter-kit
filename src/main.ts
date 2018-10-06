import { Server } from 'http';
import { AddressInfo } from 'net';
import * as configModule from './config';

type ProcessArgv = string[];
type ProcessExit = (code?: number) => never;
type ProcessCwd = () => string;

interface IProcess {
  argv: ProcessArgv;
  exit: ProcessExit;
  cwd: ProcessCwd;
}

export interface IConfig {
  port: number;
  host: string;
}

interface ILogger {
  error: (...error: any[]) => void;
  log: (...message: any[]) => void;
}

interface IServer {
  listen(
    port: number,
    hostname: string,
    callback?: (error: any) => void,
  ): Server;
}

interface ICreateServerDeps {
  logger: ILogger;
  server: IServer;
}

interface IMainDeps {
  logger: ILogger;
  server: IServer;
  process: IProcess;
}

export const createServer = (deps: ICreateServerDeps) => ({
  port,
  host,
}: IConfig) => {
  return new Promise<Server>((resolve, reject) => {
    const server = deps.server.listen(port, host, (error: any) => {
      if (error) {
        deps.logger.error('AN ERROR OCCURED', error);
        reject(new Error(error));
      }
      resolve(server);
    });
  });
};

const getServerAdressAsString = (server: {
  address: () => AddressInfo | string;
}) => {
  const serverAdress = server.address();
  return (serverAdress as AddressInfo).address
    ? `http://${(serverAdress as AddressInfo).address}:${
        (serverAdress as AddressInfo).port
      }/`
    : (serverAdress as string);
};

const logSuccessListening = (logger: ILogger) => (server: {
  address: () => AddressInfo | string;
}) => {
  logger.log(`server listening on ${getServerAdressAsString(server)}`);
};

const getConfig = (process: IProcess) =>
  configModule.getConfigFromJSONFile(
    configModule.getAbsoluteConfigPath(process.cwd())(
      configModule.getConfigFilePathFormArgv(process.argv),
    ),
  );

const startServer = (deps: IMainDeps) => (config: IConfig) =>
  createServer(deps)(config).then(logSuccessListening(deps.logger));

const exitWithFatalError = (deps: IMainDeps) => (error: any) => {
  deps.logger.error('FATAL ERROR: ', error);
  return deps.process.exit(1);
};

export const main = (deps: IMainDeps) =>
  getConfig(deps.process)
    .then(startServer(deps))
    .catch(exitWithFatalError(deps));
