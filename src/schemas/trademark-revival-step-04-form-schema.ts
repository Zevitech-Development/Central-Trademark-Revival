import { z } from "zod";

export const TrademarkRevivalStep04FormSchema = z.object({
  isAcknowledged: z.literal(true),
});
