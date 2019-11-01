import express from 'express';
import bluebird from 'bluebird';
import tape from 'tape';

import { main, IMainDeps } from '../src/main';
import { IEnv } from '../src/deps.type';

export const MAIN_ARGS: IMainDeps = {
  express: express(),
  logger: console,
  process: {
    env: {},
  },
};

const injectEnvInArgs = (env: IEnv) => ({
  ...MAIN_ARGS,
  process: {
    env,
  },
});

export const runE2ETest = (env: IEnv | undefined = {}) => (test: tape.Test) => (
  testCase: tape.TestCase,
) =>
  main(injectEnvInArgs(env)).then(server =>
    bluebird.try(() => testCase(test)).finally(() => server.close()),
  );
