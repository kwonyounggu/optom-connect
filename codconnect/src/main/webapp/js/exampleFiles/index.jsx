import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import ProductList from "./Components/Product/ProductList";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.Fragment>
    <App />
    <ProductList />
  </React.Fragment>,
  rootElement
);
