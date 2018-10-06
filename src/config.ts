import path from 'path';
import { readFile } from 'mz/fs';

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

export const getAbsoluteConfigPath = (directory: string) => (
  filePath: string,
) => {
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

export const getConfigFromJSONFile = (filePath: string) =>
  readFile(filePath, 'utf-8')
    .then(JSON.parse)
    .then(validateConfigObject);
