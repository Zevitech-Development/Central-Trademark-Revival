import { z } from "zod";

import { HiddenCharacterRegex } from "@/constants/regex-formats";

import {
  PhoneNumberSchemaValidator,
  StrictStringValidator,
  ZipCodeSchemaValidator,
  EmailSchemaValidator,
} from "@/utils/form-validators";

export const TrademarkRevivalStep01FormSchema = z.object({
  formId: z.string(),
  firstName: StrictStringValidator("first name"),
  lastName: StrictStringValidator("last name"),
  address: StrictStringValidator("address"),
  state: StrictStringValidator("state"),
  city: StrictStringValidator("city"),
  zipCode: ZipCodeSchemaValidator,
  emailAddress: EmailSchemaValidator,
  phoneNumber: PhoneNumberSchemaValidator,
  landlineNumber: PhoneNumberSchemaValidator.optional(),
  prefferedContactTime: z
    .string()
    .optional()
    .transform((val) => (val ? val.trim() : val))
    .refine((val) => !val || !HiddenCharacterRegex.test(val), {
      message: "Invalid characters detected in preferred contact time.",
    }),
});
