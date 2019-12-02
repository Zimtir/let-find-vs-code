const DEBUG = false;

export const log = (param: any) => {
  if (DEBUG) {
    console.log(param);
  }
};
