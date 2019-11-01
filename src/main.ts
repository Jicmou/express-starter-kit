import bluebird from 'bluebird';
import * as types from './deps.type';
import { getConfig } from './config/config';
import { startServer } from './server/server';

export interface IMainDeps {
  express: types.IExpress;
  logger: types.Logger;
  process: types.Process;
}

export const main = ({ express, logger, process }: IMainDeps) =>
  bluebird
    .try(() => getConfig({ process }))
    .then(startServer({ express, logger }));
