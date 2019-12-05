import Source from "../interfaces/source.interface";

import MSDNModel from "../models/msdn.model";
import GoogleModel from "../models/google.model";
import StackOverflowModel from "../models/stackoverflow.model";

export default class SourceHelper {
  getSources = (query: string): Source[] => {
    let output: Source[] = [];

    output.push(new MSDNModel(query));
    output.push(new GoogleModel(query));
    output.push(new StackOverflowModel(query));

    return output;
  };
}
