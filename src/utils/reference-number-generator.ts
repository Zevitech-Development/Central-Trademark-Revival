import { nanoid } from "nanoid";

export const ReferenceNumberGenerator = (): string => {
  return `INV-${Date.now().toString(36).toUpperCase()}-${nanoid(
    6
  ).toUpperCase()}`;
};
