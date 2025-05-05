import { configureStore } from "@reduxjs/toolkit";

import formReducer from "./slices/form-slice";
import invoiceReducer from "./slices/invoice-slice";

export const store = configureStore({
  reducer: {
    form: formReducer,
    invoice: invoiceReducer,
  },
});
