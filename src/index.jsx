import React from "react";
import { hydrate, render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import theme from "@styles/theme";
import ModalProvider from "@components/modal/ModalProvider";
import ModalContainer from "@components/modal/ModalContainer";
import { QueryClient, QueryClientProvider } from "react-query";
import GlobalStyles from "./styles/GlobalStyles";


import { store } from "./store/store";

import Client from "./Client";

const queryClient = new QueryClient();

const rootElement = document.querySelector("#root");

const root = (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ModalProvider>
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <Client />
            <ModalContainer />
          </Provider>
        </ThemeProvider>
      </ModalProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
if (process.env.NODE_ENV === "development") {
  render(root, rootElement);
} else {
  hydrate(root, rootElement);
}

