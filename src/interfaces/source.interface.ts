export default interface Source {
  title: string;
  url: string;
  find?: (query: string) => Promise<Source[]>;
  description?: string;
  updated?: string;
}
