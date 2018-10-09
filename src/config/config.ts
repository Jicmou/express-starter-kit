import * as types from '../deps.type';
import { ReadFile } from '../utils/fs';

export interface IConfig {
  port: number;
  host: string;
}

interface IMaybeConfig {
  host?: string;
  port?: number;
}

export type Argv = string[];

const VALID_CONFIG_FILE_PATH = /.json$/;

export const getConfigFilePathFormArgv = (argv: Argv) => {
  const configFilePathList = argv.filter(
    (arg, index, argList) =>
      argList[index - 1] === '--config' && VALID_CONFIG_FILE_PATH.test(arg),
  );
  if (configFilePathList.length !== 1) {
    throw new Error(`unable to retrieve config file path`);
  }
  return configFilePathList[0];
};

export const getAbsoluteConfigPath = (path: types.IPath) => (
  directory: string,
) => (filePath: string) => {
  if (!filePath) {
    throw new Error(`invalid path: ${filePath}`);
  }
  if (!path.isAbsolute(directory)) {
    throw new Error(`invalid directory path: ${directory}`);
  }
  return path.isAbsolute(filePath) ? filePath : path.join(directory, filePath);
};

export const validateConfigObject = (maybeConfig: IMaybeConfig) => {
  if (!(maybeConfig.host && maybeConfig.port)) {
    throw new Error(`invalid config Object: ${maybeConfig}`);
  }
  return maybeConfig as IConfig;
};

export const getConfigFromJSONFile = (readFile: ReadFile) => (
  filePath: string,
) =>
  readFile(filePath)
    .then(JSON.parse)
    .then(validateConfigObject);

interface IGetConfigDeps {
  process: types.IProcessArgv & types.IProcessCwd;
  readFile: ReadFile;
  path: types.IPath;
}
export const getConfig = ({ path, process, readFile }: IGetConfigDeps) =>
  getConfigFromJSONFile(readFile)(
    getAbsoluteConfigPath(path)(process.cwd())(
      getConfigFilePathFormArgv(process.argv),
    ),
  );
