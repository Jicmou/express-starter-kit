import tape from 'tape';

import * as testedModule from './hello-world';
import FUNCTION_STUB from '../testing/function.stub';

tape(`hello-world.ts greetWorld(): `, (test: tape.Test) => {
  const mockResponse: testedModule.IHelloWorldResponse = {
    send: (_statusCode: number, body: string) => {
      test.equals(
        body,
        testedModule.HELLO_WORLD,
        `SHOULD send ${testedModule.HELLO_WORLD} as response`,
      );
      test.end();
    },
  };
  testedModule.greetWorld({}, mockResponse, FUNCTION_STUB);
});
