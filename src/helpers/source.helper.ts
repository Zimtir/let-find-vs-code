import Source from "../interfaces/source.interface";
import MSDNModel from "../models/msdn.model";
import GoogleModel from "../models/google.model";
import SourceModel from "../models/source.model";

export const getSources = (query: string): Source[] => {
  let output: Source[] = [];
  output.push(new SourceModel(query));
  output.push(new MSDNModel(query));
  output.push(new GoogleModel(query));

  return output;
};
