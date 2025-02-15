import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 

ReactDOM.createRoot(document.getElementById("root")).render(
    <CartProvider>
        <App />
    </CartProvider>
);