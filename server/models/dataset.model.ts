import * as timeago from "timeago.js";
import EntryModel from "./entry.model";

export default class DatasetModel {
  constructor(obj: DatasetModel) {
    this.time = timeago.format(obj.time);
    this.entries = obj.entries;
  }

  time: string;
  entries: EntryModel[];
}
