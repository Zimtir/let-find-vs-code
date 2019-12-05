import Source from "../interfaces/source.interface";

import CommonHelper from "../helpers/common.helper";
import LogHelper from "../helpers/log.helper";

export default class GoogleModel implements Source {
  logHelper: LogHelper;
  commonHelper: CommonHelper;

  constructor(query: string) {
    this.title = `🔎 Search Google: ${query}`;
    this.url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

    this.logHelper = new LogHelper();
    this.commonHelper = new CommonHelper();
  }

  title: string;
  url: string;

  find: (query: string) => Promise<Source[]> = async (query: string) => {
    return [];
  };
}
