import express from 'express';
import tape from 'tape';
import http from 'http';

import * as testedModule from './server';

const closeServer = (server: http.Server) =>
  new Promise<http.Server>(resolve => server.close(() => resolve(server)));

// tslint:disable-next-line:no-empty
const MOCK_LOG = /* istanbul ignore next */ () => {};

tape(
  `server.ts: startServer()
  GIVEN an express app
  AND a valid config`,
  (test: tape.Test) => {
    return testedModule
      .startServer({
        express: express(),
        logger: {
          log: MOCK_LOG,
        },
      })({
        host: 'localhost',
        port: 3000,
      })
      .then((server: any) => {
        test.assert(
          server instanceof http.Server,
          'THEN it SHOULD return a Server',
        );
        return server;
      })
      .then(closeServer)
      .then(() => test.end());
  },
);
