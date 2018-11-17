export type FsReadFileCallBack = (
  err: NodeJS.ErrnoException | undefined,
  data: string | undefined,
) => void;

export type FsReadFile = (
  path: string,
  options: { encoding: string },
  callback: FsReadFileCallBack,
) => void;

export interface IFs {
  readFile: FsReadFile;
}

export type ReadFile = (path: string) => Promise<string>;

export const readFile = (fs: IFs) => (path: string) => {
  return new Promise<string>((resolve, reject) =>
    fs.readFile(path, { encoding: 'utf-8' }, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    }),
  );
};
