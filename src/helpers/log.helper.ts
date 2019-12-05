export default class LogHelper {
  DEBUG: boolean = false;

  log = (param: any) => {
    if (this.DEBUG) {
      console.log(param);
    }
  };
}
