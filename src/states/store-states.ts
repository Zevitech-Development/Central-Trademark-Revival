import { InvoiceItemInterface } from "@/interfaces/store-interfaces";
import {
  TrademarkRevivalStep01FormType,
  TrademarkRevivalStep02FormType,
  TrademarkRevivalStep03FormType,
  TrademarkRevivalStep04FormType,
} from "@/types/forms-type";

export interface FormState {
  formId: string | null;

  step01Data: TrademarkRevivalStep01FormType | null;
  step02Data: TrademarkRevivalStep02FormType | null;
  step03Data: TrademarkRevivalStep03FormType | null;
  step04Data: TrademarkRevivalStep04FormType | null;

  currentStep: number;

  isComplete: boolean;
}

export const FormSliceInitialState: FormState = {
  formId: null,

  step01Data: null,
  step02Data: null,
  step03Data: null,
  step04Data: null,

  currentStep: 1,
  isComplete: false,
};

export interface InvoiceState {
  invoiceId: string | null;
  formId: string | null;
  referenceNumber: string | null;
  customerName: string | null;
  customerEmail: string | null;
  date: string | null;
  paymentTime: string | null;
  paymentMethod: string | null;
  packageType: string | null;
  packageAmount: number | null;
  items: InvoiceItemInterface[];
  totalAmount: number | null;
  isPaid: boolean;
  pdfUrl: string | null;
}

export const InvoiceInitialState: InvoiceState = {
  invoiceId: null,
  formId: null,
  referenceNumber: null,
  customerName: null,
  customerEmail: null,
  date: null,
  paymentTime: null,
  paymentMethod: null,
  packageType: null,
  packageAmount: null,
  items: [],
  totalAmount: null,
  isPaid: false,
  pdfUrl: null,
};
