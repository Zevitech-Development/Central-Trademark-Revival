import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { InvoiceItemInterface } from "@/interfaces/store-interfaces";

import { InvoiceInitialState } from "@/states/store-states";

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState: InvoiceInitialState,
  reducers: {
    setInvoiceId: (state, action: PayloadAction<string>) => {
      state.invoiceId = action.payload;
    },

    setFormId: (state, action: PayloadAction<string>) => {
      state.formId = action.payload;
    },

    setReferenceNumber: (state, action: PayloadAction<string>) => {
      state.referenceNumber = action.payload;
    },

    setCustomerInfo: (
      state,
      action: PayloadAction<{ name: string; email: string }>
    ) => {
      state.customerName = action.payload.name;
      state.customerEmail = action.payload.email;
    },

    setPaymentDetails: (
      state,
      action: PayloadAction<{
        date: string;
        paymentTime: string;
        paymentMethod: string;
      }>
    ) => {
      state.date = action.payload.date;
      state.paymentTime = action.payload.paymentTime;
      state.paymentMethod = action.payload.paymentMethod;
    },

    setPackageDetails: (
      state,
      action: PayloadAction<{ packageType: string; packageAmount: number }>
    ) => {
      state.packageType = action.payload.packageType;
      state.packageAmount = action.payload.packageAmount;
    },

    addInvoiceItem: (state, action: PayloadAction<InvoiceItemInterface>) => {
      state.items.push(action.payload);
    },

    removeInvoiceItem: (state, action: PayloadAction<number>) => {
      state.items.splice(action.payload, 1);
    },

    updateInvoiceItem: (
      state,
      action: PayloadAction<{ index: number; item: InvoiceItemInterface }>
    ) => {
      state.items[action.payload.index] = action.payload.item;
    },

    calculateTotalAmount: (state) => {
      const itemsTotal = state.items.reduce(
        (total, item) => total + item.amount,
        0
      );
      const packageAmount = state.packageAmount || 0;

      state.totalAmount = packageAmount + itemsTotal;
    },

    markAsPaid: (state) => {
      state.isPaid = true;
      state.paymentTime = new Date().toISOString();
    },

    setPdfUrl: (state, action: PayloadAction<string>) => {
      state.pdfUrl = action.payload;
    },

    resetInvoice: () => {
      return InvoiceInitialState;
    },
  },
});

export const {
  setInvoiceId,
  setFormId,
  setReferenceNumber,
  setCustomerInfo,
  setPaymentDetails,
  setPackageDetails,
  addInvoiceItem,
  removeInvoiceItem,
  updateInvoiceItem,
  calculateTotalAmount,
  markAsPaid,
  setPdfUrl,
  resetInvoice,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
