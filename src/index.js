import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "rsuite/dist/styles/rsuite-default.css";
import store from "state/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

/* <React.StrictMode>
<Provider store={store}>
  <App />
</Provider>
</React.StrictMode>, */
