"use client";

import cookies from "js-cookie";

export const SetStepCompletionCookie = (stepNumber: number, formId: string) => {
  cookies.set(`step0${stepNumber}_completed`, "true", {
    path: "/",
    expires: 1,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  cookies.set("formId", formId, {
    path: "/",
    expires: 1,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

export const SetPaymentCompletionCookie = (referenceNumber: string) => {
  cookies.set("payment_completed", "true", {
    path: "/",
    expires: 1,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  cookies.set("payment_reference", referenceNumber, {
    path: "/",
    expires: 30,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

export const ClearAllFormCookies = () => {
  cookies.remove("step01_completed");
  cookies.remove("step02_completed");
  cookies.remove("step03_completed");
  cookies.remove("step04_completed");

  cookies.remove("payment_completed");

  cookies.remove("formId");
  cookies.remove("payment_reference");
};

export const GetFormIdFromCookies = (): string | undefined => {
  return cookies.get("formId");
};

export const GetPaymentReferenceFromCookies = (): string | undefined => {
  return cookies.get("payment_reference");
};

export const IsStepCompleted = (stepNumber: number): boolean => {
  return !!cookies.get(`step0${stepNumber}_completed`);
};

export const IsPaymentCompleted = (): boolean => {
  return !!cookies.get("payment_completed");
};
