import Source from "../interfaces/source.interface";

export default class SourceModel implements Source {
  constructor(query: string) {
    this.title = "🔎 Get my statistics";
    this.url = "http://localhost:8081/getStatistics";
  }
  title: string;
  url: string;

  find: (query: string) => Promise<Source[]> = async (query: string) => {
    return [];
  };
}
