/* istanbul ignore file */
import fs from 'fs';

export const readFile = (path: string) => {
  return new Promise<string>((resolve, reject) =>
    fs.readFile(path, { encoding: 'utf-8' }, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    }),
  );
};
