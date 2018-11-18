export interface IHelloWorldResponse {
  send: (statusCode: number, body: string) => void;
}

export const HELLO_WORLD = 'Hello, world!';

export const greetWorld = (
  _request: {},
  response: IHelloWorldResponse,
  _next: () => void,
) => {
  response.send(200, HELLO_WORLD);
};
