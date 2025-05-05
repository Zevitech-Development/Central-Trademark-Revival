import { z } from "zod";

import { PackageTypeEnum } from "@/enums/package-type-enum";

export const TrademarkRevivalStep03FormSchema = z.object({
  packageType: z.enum(Object.values(PackageTypeEnum) as [string, ...string[]]),
});
