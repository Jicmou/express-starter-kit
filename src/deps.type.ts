import { Server } from 'http';
import { AddressInfo } from 'net';

import { IRouterMatcherDictionnary } from './router/router.type';

export interface IEnv {
  PORT?: number;
  HOST?: string;
}

export interface IProcessEnv {
  env: IEnv;
}

export type Process = IProcessEnv;

type LogError = (...error: any[]) => void;
type Log = (...message: any[]) => void;

export interface IErrorLogger {
  error: LogError;
}
export interface ILogLogger {
  log: Log;
}

export type Logger = IErrorLogger & ILogLogger;

export interface IServerAddress {
  address: () => AddressInfo | string;
}

export type ListenServer = (
  port: number,
  hostname: string,
  callback?: (error: any) => void,
) => Server;

export interface IExpress extends IRouterMatcherDictionnary {
  listen: ListenServer;
}
