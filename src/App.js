// React
import React from "react";
// Components
import Categories from "./components/Categories";
import Header from "./components/Header";
import Mosaic from "./components/Mosaic";
import Search from "./components/Search";
// Context
import { useCustomContext } from "./context/Context.js";

function App() {
  const { viewingCategories } = useCustomContext();

  return (
    <>
      <Header />
      <Search />
      {viewingCategories && <Categories />}
      {!viewingCategories && <Mosaic />}
    </>
  );
}

export default App;
