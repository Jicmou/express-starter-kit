import express from 'express';
import { main } from './main';
import { readFile } from 'mz/fs';

main({
  express: express(),
  logger: console,
  process,
  readFile,
});
