export interface IHelloWorldResponse {
  status: (statusCode: number) => IHelloWorldResponse;
  send: (body: string) => IHelloWorldResponse;
}

export const HELLO_WORLD = 'Hello, world!';

export const greetWorld = (
  _request: {},
  response: IHelloWorldResponse,
  _next: () => void,
) => {
  response.status(200).send(HELLO_WORLD);
};
