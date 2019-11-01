import * as types from '../deps.type';

export interface IConfig {
  port: number;
  host: string;
}

export const DEFAULT_CONFIG: IConfig = {
  host: 'localhost',
  port: 3000,
};

export const getConfigFromEnv = (env: types.IEnv): Promise<IConfig> =>
  Promise.resolve({
    host: env.HOST || DEFAULT_CONFIG.host,
    port: env.PORT || DEFAULT_CONFIG.port,
  });

export interface IGetConfigDeps {
  process: types.IProcessEnv;
}

export const getConfig = ({ process }: IGetConfigDeps) =>
  getConfigFromEnv(process.env);
