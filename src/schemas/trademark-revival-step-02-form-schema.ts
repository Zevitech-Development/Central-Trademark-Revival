import { z } from "zod";

import { ProtectionTypeEnum } from "@/enums/protection-type-enum";

export const TrademarkRevivalStep02FormSchema = z.object({
  protectionType: z.enum(
    Object.values(ProtectionTypeEnum) as [string, ...string[]]
  ),
  protectionName: z.string().optional().nullable(),
  protectionLogo: z.string().optional().nullable(),
  protectionLogoColorScheme: z.string().optional().nullable(),
  protectionLogoLiteralElements: z.string().optional().nullable(),
  protectionSlogan: z.string().optional().nullable(),

  isTrademarkInUse: z.boolean(),
  trademarkFirstUseDate: z.date().optional().nullable(),
  trademarkFirstUseInCommerceDate: z.date().optional().nullable(),
  trademarkInUseOwnershipDetails: z.string().optional().nullable(),

  isIndividuallyOwnedTrademark: z.boolean(),
  isUSBasedOrganization: z.boolean(),
  organizationName: z.string().optional().nullable(),
  organizationType: z.string().optional().nullable(),
  organizationFormationCountry: z.string().optional().nullable(),
  organizationFormationState: z.string().optional().nullable(),
  organizationPosition: z.string().optional().nullable(),

  businessClassification: z
    .string()
    .min(1, { message: "Please provide your business classification." }),
});
