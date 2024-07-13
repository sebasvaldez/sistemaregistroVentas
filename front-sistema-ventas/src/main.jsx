import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./providers/AuthProvider.jsx";
import { ProductProvider } from "./providers/ProductProvider.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ProductProvider>

    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ProductProvider>
  </AuthProvider>
);
