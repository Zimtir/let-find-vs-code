import Source from "../interfaces/source.interface";
import axios from "axios";

export default class StackOverflowModel implements Source {
  constructor(query: string) {
    this.title = `🔎 Search Stackoverflow: ${query}`;
    this.url = `https://stackoverflow.com/search?q=${encodeURIComponent(
      query
    )}`;
  }
  title: string;
  url: string;

  async find(search: string): Promise<Source[]> {
    let url = "https://api.stackexchange.com/2.2/search?";
    let params = [
      "order=desc",
      "sort=relevance",
      `intitle=${encodeURIComponent(search)}`,
      "site=stackoverflow",
      `key=${process.env.STACKOVERFLOW_API_KEY}`
    ];

    const response = await axios.get(url + params.join("&"));

    let index = 0;
    const sources = response.data.items.map(
      (result: any): Source => {
        index++;
        return {
          title: `${index}: ${result.is_answered ? "✅" : "🛠"} ${
            result.score
          } 🎲${result.answer_count} 🚦${decodeURIComponent(
            result.title
          )} 🏷️${result.tags.join(",")}`,
          url: result.link
        };
      }
    );

    return sources;
  }
}
