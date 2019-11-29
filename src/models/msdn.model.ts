import Source from "../interfaces/source.interface";

export default class MSDNModel implements Source {
  constructor(query: string) {
    (this.title = `🔎 Search MSDN: ${query}`), (this.url = "");
  }
  title: string;
  url: string;
}
