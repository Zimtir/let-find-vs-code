import Source from "../interfaces/source.interface";

export default class GoogleModel implements Source {
  constructor(query: string) {
    this.title = `🔎 Search Google: ${query}`;
    this.url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  }
  title: string;
  url: string;

  find: (query: string) => Promise<Source[]> = async (query: string) => {
    return [];
  };
}
