export default class EntryModel {
  constructor(obj: EntryModel) {
    this.name = obj.name;
    this.value = obj.value;
  }

  name: string;
  value: number;
}
