import React from "react";
import ReactDOM from "react-dom";
// Apollo
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
// Component
import Data from "./Data";
// ImageGallery
import "react-image-gallery/styles/css/image-gallery.css";
import "./index.css";

const client = new ApolloClient({
  uri: process.env.REACT_APP_WP_API,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Data />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
