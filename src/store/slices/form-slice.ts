import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  TrademarkRevivalStep01FormType,
  TrademarkRevivalStep02FormType,
  TrademarkRevivalStep03FormType,
  TrademarkRevivalStep04FormType,
} from "@/types/forms-type";

import { FormSliceInitialState, FormState } from "@/states/store-states";

export const formSlice = createSlice({
  name: "form",
  initialState: FormSliceInitialState,
  reducers: {
    setFormId: (state, action: PayloadAction<string>) => {
      state.formId = action.payload;
    },

    clearFormId: (state) => {
      state.formId = null;
    },

    setStep01Data: (
      state,
      action: PayloadAction<TrademarkRevivalStep01FormType>
    ) => {
      state.step01Data = action.payload;
      state.formId = action.payload.formId;
      state.currentStep = 2;
    },

    setStep02Data: (
      state,
      action: PayloadAction<TrademarkRevivalStep02FormType>
    ) => {
      state.step02Data = action.payload;
      state.currentStep = 3;
    },

    setStep03Data: (
      state,
      action: PayloadAction<TrademarkRevivalStep03FormType>
    ) => {
      state.step03Data = action.payload;
      state.currentStep = 4;
    },

    setStep04Data: (
      state,
      action: PayloadAction<TrademarkRevivalStep04FormType>
    ) => {
      state.step04Data = action.payload;
      state.currentStep = 5;
    },

    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },

    completeForm: (state) => {
      state.isComplete = true;
    },

    resetForm: () => {
      return FormSliceInitialState;
    },
  },
});

export const {
  setFormId,
  clearFormId,

  setStep01Data,
  setStep02Data,
  setStep03Data,
  setStep04Data,
  setCurrentStep,

  completeForm,
  resetForm,
} = formSlice.actions;

export const selectFormId = (state: { form: FormState }) => state.form.formId;
export const selectStep01Data = (state: { form: FormState }) =>
  state.form.step01Data;
export const selectStep02Data = (state: { form: FormState }) =>
  state.form.step02Data;
export const selectStep03Data = (state: { form: FormState }) =>
  state.form.step03Data;
export const selectStep04Data = (state: { form: FormState }) =>
  state.form.step04Data;
export const selectCurrentStep = (state: { form: FormState }) =>
  state.form.currentStep;
export const selectIsComplete = (state: { form: FormState }) =>
  state.form.isComplete;

export default formSlice.reducer;
