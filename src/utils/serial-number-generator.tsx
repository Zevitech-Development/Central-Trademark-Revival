import { nanoid } from "nanoid";

import { GenerateSerialNumberOptionsInterface } from "@/interfaces/utils-interface";

export const GenerateSerialNumber = ({
  prefix = "FORM",
  length = 8,
  includeTimestamp = true,
}: GenerateSerialNumberOptionsInterface = {}): string => {
  const id = nanoid(length).toUpperCase();
  const timestamp = includeTimestamp
    ? Date.now().toString(36).toUpperCase()
    : "";
  return `${prefix}-${timestamp}-${id}`;
};
