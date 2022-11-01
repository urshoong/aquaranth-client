import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import GlobalStyles from "./styles/GlobalStyles";
import { store } from "./store/store";

import App from "./App";

const root = document.querySelector("#root");

ReactDOM.render(
  <BrowserRouter>
    <GlobalStyles />
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  root,
);
