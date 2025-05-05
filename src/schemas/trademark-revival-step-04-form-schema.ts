import { z } from "zod";

export const TrademarkRevivalStep04FormSchema = z.object({
  isAcknowledged: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge the notice before proceeding.",
  }),
});
