// React
import React from "react";
// Components
import Artists from "./components/Artists";
import Categories from "./components/Categories";
import Header from "./components/Header";
import Mosaic from "./components/Mosaic";
import Search from "./components/Search";
// Context
import { useCustomContext } from "./context/Context.js";

function App() {
  const { viewingArtists, viewingCategories } = useCustomContext();

  return (
    <>
      <Header />
      <Search />
      {viewingArtists && <Artists />}
      {viewingCategories && <Categories />}
      {!viewingArtists && !viewingCategories && <Mosaic />}
    </>
  );
}

export default App;
