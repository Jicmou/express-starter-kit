import express from 'express';
import { main } from './main';

main({
  express: express(),
  logger: console,
  process,
});
