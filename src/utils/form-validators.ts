import { z } from "zod";
import validator from "validator";

import {
  EmailRegex,
  HiddenCharacterRegex,
  StringRegex,
  USPhoneNumberRegex,
  USZipCodeRegex,
} from "@/constants/regex-formats";

export const StrictStringValidator = (field: string) =>
  z
    .string()
    .min(1, { message: `Please provide your ${field}.` })
    .regex(StringRegex, {
      message: `Invalid whitespace in ${field}.`,
    })
    .refine((val) => !HiddenCharacterRegex.test(val), {
      message: `Invalid characters detected in ${field}.`,
    });

export const ZipCodeSchemaValidator = z.string().regex(USZipCodeRegex, {
  message: "Enter a valid US zip code (e.g., 12345 or 12345-6789).",
});

export const PhoneNumberSchemaValidator = z
  .string()
  .regex(USPhoneNumberRegex, {
    message: "Enter a valid US phone number (e.g., 555-555-5555).",
  })
  .refine((val) => validator.isMobilePhone(val, "en-US"), {
    message: "Invalid US phone number format.",
  });

export const EmailSchemaValidator = z
  .string()
  .regex(EmailRegex, {
    message: "Enter a valid email address (e.g., example@email.com).",
  })
  .refine((val) => !HiddenCharacterRegex.test(val), {
    message: "Invalid characters detected in email address.",
  })
  .transform((val) => val.trim());
