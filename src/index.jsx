import React from "react";
import { hydrate, render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import theme from "@styles/theme";
import { CookiesProvider } from "react-cookie";
import GlobalStyles from "./styles/GlobalStyles";

import { store } from "./store/store";

import App from "./App";


const rootElement = document.querySelector("#root");

const root = (
  <BrowserRouter>
    <GlobalStyles />
    <ThemeProvider theme={theme}>
      <CookiesProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </CookiesProvider>
    </ThemeProvider>
  </BrowserRouter>
);
if (process.env.NODE_ENV === "development") {
  render(root, rootElement);
} else {
  hydrate(root, rootElement);
}
