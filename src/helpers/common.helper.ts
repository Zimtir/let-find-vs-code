export default class CommonHelper {
  checkString = (str: string): boolean => {
    return (
      this.checkObj(str) && str.length > 0 && str !== "" && str.trim() !== ""
    );
  };

  checkObj = (obj: any): boolean => {
    return obj !== undefined && obj !== null;
  };

  checkOrEmpty = (str: string): string => {
    return this.checkString(str) ? str : "";
  };
}
