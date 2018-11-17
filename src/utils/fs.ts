export type FsReadFileCallBack = (
  err: NodeJS.ErrnoException | undefined,
  data: string | undefined,
) => void;

export type FsReadFile = (
  path: string,
  options: { encoding: string },
  callback: FsReadFileCallBack,
) => void;

export type ReadFile = (path: string) => Promise<string>;

export const readFileFactory: (fsReadFile: FsReadFile) => ReadFile = (
  fsReadFile: FsReadFile,
) => (path: string) => {
  return new Promise<string>((resolve, reject) =>
    fsReadFile(path, { encoding: 'utf-8' }, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    }),
  );
};
