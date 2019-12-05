export default class CommonHelper {
  /**
   * Returns the completness of the string.
   *
   * @param str - The any string
   * @returns The comparing of the input string with empty
   *
   */
  checkString = (str: string): boolean => {
    return (
      this.checkObj(str) && str.length > 0 && str !== '' && str.trim() !== ''
    )
  }

  /**
   * Returns the completness of the object.
   *
   * @param obj - The any obj
   * @returns The comparing of the input object with empty
   *
   */
  checkObj = (obj: any): boolean => {
    return obj !== undefined && obj !== null
  }

  /**
   * Returns the input string or empty string.
   *
   * @param str - The any string
   * @returns The input string or empty when string is not completness
   *
   */
  checkOrEmpty = (str: string): string => {
    return this.checkString(str) ? str : ''
  }
}
