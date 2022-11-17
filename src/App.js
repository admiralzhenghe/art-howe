// React
import React from "react";
// Components
import Artists from "./components/Artists";
import Artwork from "./components/Artwork";
import Categories from "./components/Categories";
import Header from "./components/Header";
import Mosaic from "./components/Mosaic";
import Search from "./components/Search";
// Context
import { useCustomContext } from "./context/Context";

function App() {
  const { view } = useCustomContext();

  return (
    <>
      <Header />
      <Search />
      {view.viewing === view.type.ARTISTS && <Artists />}
      {view.viewing === view.type.ARTWORK && <Artwork />}
      {view.viewing === view.type.CATEGORIES && <Categories />}
      {view.viewing === view.type.MOSAIC && <Mosaic />}
    </>
  );
}

export default App;
