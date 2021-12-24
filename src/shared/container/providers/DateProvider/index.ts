import { container } from "tsyringe";
import "dotenv/config";

import { IDateProvider } from "./IDateProvider";
import { DayJsDateProvider } from "./implementations/DayJsDateProvider";

container.registerSingleton<IDateProvider>(
  "DayJsDateProvider",
  DayJsDateProvider
);
