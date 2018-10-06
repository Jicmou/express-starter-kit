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
