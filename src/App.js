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
  const [mosaicLoading, mosaicData] = useFetchMosaic();
  const [filtersLoading, [artistsData, categoriesData]] = useFetchFilters();

  if (mosaicLoading || filtersLoading) {
    return (
      <>
        <Nav />
        <SearchBar />
      </>
    );
  }

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
}

export default App;
