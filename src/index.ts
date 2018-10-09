import express from 'express';
import path from 'path';
import { main } from './main';
import { readFile } from './utils/fs';

main({
  express: express(),
  logger: console,
  path,
  process,
  readFile,
});
