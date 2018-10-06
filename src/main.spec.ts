import express from 'express';
import tape from 'tape';
import http from 'http';

import * as testedModule from './main';

tape(
  `Main.ts:
  GIVEN a port
  AND a valid host
  WHEN calling createServer()`,
  (test: tape.Test) => {
    return testedModule
      .createServer({
        logger: console,
        server: express(),
      })({ host: 'localhost', port: 1234 })
      .then((result: http.Server) => {
        test.assert(
          result instanceof http.Server,
          'THEN it SHOULD return a Server',
        );
        return result;
      })
      .then(server => server.close())
      .then(() => test.end());
  },
);
