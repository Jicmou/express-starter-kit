import tape from 'tape';

import * as testedModule from './hello-world';
import FUNCTION_STUB from '../testing/function.stub';

tape(`hello-world.ts greetWorld(): `, (test: tape.Test) => {
  const mockResponse: testedModule.IHelloWorldResponse = {
    send: (body: string) => {
      test.equals(
        body,
        testedModule.HELLO_WORLD,
        `SHOULD send "${testedModule.HELLO_WORLD}" as response`,
      );
      test.end();
      return mockResponse;
    },
    status: (statusCode: number) => {
      test.equals(
        statusCode,
        200,
        `SHOULD send response with status code: 200`,
      );
      return mockResponse;
    },
  };
  testedModule.greetWorld({}, mockResponse, FUNCTION_STUB);
});
