import Source from "../interfaces/source.interface";
import axios from "axios";
import { log } from "../helpers/log.helper";

export default class MSDNModel implements Source {
  constructor(query: string) {
    this.title = `🔎 Search MSDN: ${query}`;
    this.url = "";
  }
  title: string;
  url: string;

  async find(search: string): Promise<Source[]> {
    const url = `https://docs.microsoft.com/api/search?search=${search}&locale=en-us&top=10`;
    log(url);
    const response = await axios.get(url);

    const sources = response.data.results.map(
      (result: any): Source => {
        return {
          title: result.title,
          url: result.url,
          updated: result.lastUpdatedDate,
          description: result.description
        };
      }
    );
    return sources;
  }
}
