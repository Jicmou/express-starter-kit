import express from 'express';
import fs from 'fs';
import path from 'path';
import bluebird from 'bluebird';
import tape from 'tape';

import { main, IMainDeps } from '../src/main';
import { readFileFactory } from '../src/utils/fs';

const CONFIG_FILE_PATH = './environment-template.json';

const MOCK_ARGV = ['--config', CONFIG_FILE_PATH];

export const MAIN_ARGS: IMainDeps = {
  express: express(),
  logger: console,
  path,
  process: {
    argv: MOCK_ARGV,
    cwd: process.cwd,
    exit: process.exit,
  },
  readFile: readFileFactory(fs.readFile),
};

export const runE2ETest = (test: tape.Test) => (testCase: tape.TestCase) =>
  main(MAIN_ARGS).then(server =>
    bluebird.try(() => testCase(test)).finally(() => server.close()),
  );
