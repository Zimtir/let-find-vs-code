export const checkObj = (obj: any) => {
  return obj !== undefined && obj !== null;
};

export const checkString = (str: string) => {
  return checkObj(str) && str.length > 0 && str !== "" && str.trim() !== '';
};
