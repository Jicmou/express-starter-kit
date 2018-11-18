import { get, RequestResponse, post } from 'request';

interface IHeaders {
  authorization: string;
}

interface IGetRequest {
  uri: string;
  headers?: IHeaders;
  qs?: { [key: string]: string };
}

export const getPromisified = (
  request: IGetRequest,
): Promise<RequestResponse> =>
  new Promise((resolve, reject) =>
    get(request, (error, response) =>
      error ? reject(error) : resolve(response),
    ),
  );

export const getResponseBody = <T>(request: IGetRequest) =>
  getPromisified(request)
    .then(response => JSON.parse(response.body) as T)
    .then((response: any) => {
      if (response.Err) {
        throw new Error(`Error while retrieving data: ${response.Err}`);
      }
      return response as T;
    });

export const postPromisified = (
  uri: string,
  options: { body: {}; headers: {} },
): Promise<RequestResponse> =>
  new Promise((resolve, reject) =>
    post(uri, options, (error, response) =>
      error ? reject(error) : resolve(response),
    ),
  );
