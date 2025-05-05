"use client";

import { Provider } from "react-redux";

import { ReduxProviderType } from "@/types/providers-type";

import { store } from "@/store/index";

const ReduxProvider = ({ children }: ReduxProviderType) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
