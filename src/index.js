import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// Context
import { ContextProvider } from "./context/Context.js";
// ImageGallery
import "react-image-gallery/styles/css/image-gallery.css";
import "./index.css";

// Apollo
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.WORDPRESS_API_URL,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ContextProvider>
        <App />
      </ContextProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
