// React
import React from "react";
// Components
import Header from "./components/Header";
import Mosaic from "./components/Mosaic";
import Search from "./components/Search";
// Context
import { ContextProvider } from "./context/Context.js";

function App() {
  return (
    <ContextProvider>
      <Header />
      <Search />
      <Mosaic />
    </ContextProvider>
  );
}

export default App;
