import express from 'express';
import { main } from './main';

main({
  logger: console,
  process,
  server: express(),
});
