// Components
import Artists from "./components/Artists";
import Artwork from "./components/Artwork";
import Categories from "./components/Categories";
import Mosaic from "./components/Mosaic";
import Nav from "./components/Nav";
import Search from "./components/Search";
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
        <Search />
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
        </Routes>
      </>
    );
  } else {
    return (
      <>
        <Nav />
        <Search />
      </>
    );
  }
}

export default App;
