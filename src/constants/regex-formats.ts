export const HiddenCharacterRegex = /[\u200B-\u200F\u202A-\u202E]/g;

export const StringRegex = /^\S.*\S$|^\S$/;

export const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

export const USZipCodeRegex = /^\d{5}(-\d{4})?$/;

export const USPhoneNumberRegex =
  /^(?:\+1\s?)?(?:\(?[2-9][0-9]{2}\)?[\s.-]?)[2-9][0-9]{2}[\s.-]?[0-9]{4}$/;
