export default class LogHelper {
  DEBUG: boolean = false;

  /**
   * Logs the any data to the prepared output.
   *
   * @param data - The any obj
   *
   */
  log = (data: any) => {
    if (this.DEBUG) {
      console.log(data);
    }
  };
}
