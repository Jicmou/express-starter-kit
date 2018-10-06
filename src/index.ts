import express from 'express';
import { main } from './main';

main({
  logger: console,
  server: express(),
})({
  host: 'localhost',
  port: 3000,
});
