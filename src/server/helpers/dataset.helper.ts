import DatasetModel from "../models/dataset.model";

class AppConfiguration {
  static getInstance() {
    if (!AppConfiguration.instance) {
      AppConfiguration.instance = new AppConfiguration();
    }
    return AppConfiguration.instance;
  }

  private static instance: AppConfiguration;

  private constructor() {}

  items: DatasetModel[] = [];
}

export default AppConfiguration;
