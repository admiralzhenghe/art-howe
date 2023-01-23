// Components
import Artists from "./components/Artists";
import Artwork from "./components/Artwork";
import Categories from "./components/Categories";
import Mosaic from "./components/Mosaic";
import Nav from "./components/Nav";
import SearchBar from "./components/SearchBar";
import SearchHandler from "./components/SearchHandler";
// Custom Hooks
import { useFetchFilters } from "./hooks/useFetchFilters";
import { useFetchMosaic } from "./hooks/useFetchMosaic";
// Router
import { Route, Routes } from "react-router-dom";

function App() {
  const [filtersLoading, [artistsData, categoriesData]] = useFetchFilters();
  const [mosaicLoading, mosaicData] = useFetchMosaic();

  if (!filtersLoading && !mosaicLoading) {
    return (
      <>
        <Nav />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Mosaic mosaicData={mosaicData} />} />
          <Route
            path="/artists"
            element={<Artists artistsData={artistsData} />}
          />
          <Route
            path="/categories"
            element={<Categories categoriesData={categoriesData} />}
          />
          <Route path="/artwork/:id" element={<Artwork />} />
          <Route path="/search/:query" element={<SearchHandler />} />
        </Routes>
      </>
    );
  } else {
    return (
      <>
        <Nav />
        <SearchBar />
      </>
    );
  }
}

export default App;
