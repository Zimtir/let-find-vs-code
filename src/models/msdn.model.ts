import Source from "../interfaces/source.interface";
import axios from "axios";
import { log } from "../helpers/log.helper";
import * as timeago from "timeago.js";
import { checkOrEmpty } from "../helpers/common.helper";

export default class MSDNModel implements Source {
  constructor(query: string) {
    this.title = `🔎 Search MSDN: ${query}`;
    this.url = "https://docs.microsoft.com";
  }
  title: string;
  url: string;

  async find(search: string): Promise<Source[]> {
    const url = `https://docs.microsoft.com/api/search?search=${search}&locale=en-us&top=10`;
    log(url);
    const response = await axios.get(url);

    var index = 0;
    const sources: Source[] = [];

    response.data.results.map((result: any) => {
      const formattedDate = timeago.format(result.lastUpdatedDate);
      index++;
      sources.push({
        title: `${index}:📚 ${
          result.descriptions ? result.descriptions.length : ""
        } 😃 📅 ${formattedDate} ➡ ${checkOrEmpty(
          result.title
        )} ➡ ${checkOrEmpty(result.description)}`,
        url: result.url,
        updated: result.lastUpdatedDate,
        description: result.description
      });
    });
    return sources;
  }
}
