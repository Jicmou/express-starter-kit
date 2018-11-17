import express from 'express';
import fs from 'fs';
import path from 'path';

import { main } from './main';
import { readFileFactory } from './utils/fs';

main({
  express: express(),
  logger: console,
  path,
  process,
  readFile: readFileFactory(fs.readFile),
});
