import axios from "axios";

export const checkObj = (obj: any) => {
  return obj !== undefined && obj !== null;
};

export const checkString = (str: string) => {
  return checkObj(str) && str.length > 0 && str !== "" && str.trim() !== "";
};

export const stringBuilder = (
  parts: Array<[string, string]>,
  separator: string = ""
) => {
  return parts.join(separator);
};

export const buildParam = (element: [string, string]) => {
  return `${element[0]}=${element[1]}&`;
};

export const doRequest = async (
  cleanUrl: string,
  params: Array<[string, string]>
) => {
  let url: string = cleanUrl + "?";

  let builtParams: string = "";
  params.forEach(element => {
    builtParams += buildParam(element);
  });

  url += builtParams;
  return await axios.get(url);
};
