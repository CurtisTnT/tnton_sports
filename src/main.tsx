import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import App from "./App.tsx";
import "./index.css";
import StoreProvider from "./context/StoreProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>
);
