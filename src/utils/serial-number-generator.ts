import { nanoid } from "nanoid";

import { GenerateSerialNumberOptionsInterface } from "@/interfaces/utils-interface";

export function SerialNumberGenerator(
  options: GenerateSerialNumberOptionsInterface = {}
): string {
  const { prefix = "FORM", length = 8, includeTimestamp = true } = options;

  const id = nanoid(length).toUpperCase();
  const timestamp = includeTimestamp
    ? Date.now().toString(36).toUpperCase()
    : "";

  return `${prefix}-${timestamp}-${id}`;
}
