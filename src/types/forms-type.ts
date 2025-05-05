import { z } from "zod";

import { TrademarkRevivalStep01FormSchema } from "@/schemas/trademark-revival-step-01-form-schema";
import { TrademarkRevivalStep02FormSchema } from "@/schemas/trademark-revival-step-02-form-schema";
import { TrademarkRevivalStep03FormSchema } from "@/schemas/trademark-revival-step-03-form-schema";
import { TrademarkRevivalStep04FormSchema } from "@/schemas/trademark-revival-step-04-form-schema";

export type TrademarkRevivalStep01FormType = z.infer<
  typeof TrademarkRevivalStep01FormSchema
>;

export type TrademarkRevivalStep02FormType = z.infer<
  typeof TrademarkRevivalStep02FormSchema
>;

export type TrademarkRevivalStep03FormType = z.infer<
  typeof TrademarkRevivalStep03FormSchema
>;

export type TrademarkRevivalStep04FormType = z.infer<
  typeof TrademarkRevivalStep04FormSchema
>;

export type CloudinaryUploadWidgetType = {
  open: () => void;
};
