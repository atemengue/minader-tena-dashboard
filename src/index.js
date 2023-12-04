import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import "react-app-polyfill/ie11"; // For IE 11 support
import "react-app-polyfill/stable";
import ReactDOM from "react-dom";
import { Provider as StoreProvider } from "react-redux";
import store from "../src/store";
import App from "./App";
import { icons } from "./assets/icons";
import "./polyfill";
import * as serviceWorker from "./serviceWorker";
React.icons = icons;

ReactDOM.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
