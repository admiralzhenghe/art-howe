import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// Apollo
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
// Image Gallery
import "react-image-gallery/styles/css/image-gallery.css";
// Router
import { BrowserRouter } from "react-router-dom";

const client = new ApolloClient({
  uri: process.env.REACT_APP_WP_API,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
