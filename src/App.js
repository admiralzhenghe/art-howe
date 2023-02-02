import { lazy, Suspense } from "react";
// Components
import Mosaic from "./components/Mosaic";
import Nav from "./components/Nav";
import SearchBar from "./components/SearchBar";
import Spinner from "./components/Spinner";
// Custom Hooks
import { useFetchMosaic } from "./hooks/useFetchMosaic";
// Router
import { Route, Routes } from "react-router-dom";

const Artwork = lazy(() => import("./components/Artwork"));
const Artists = lazy(() => import("./components/Artists"));
const Categories = lazy(() => import("./components/Categories"));
const SearchHandler = lazy(() => import("./components/SearchHandler"));

function App() {
  const [loading, data] = useFetchMosaic();

  return (
    <>
      <Nav />
      <SearchBar />
      {loading ? (
        <Spinner />
      ) : (
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Mosaic data={data} />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/artwork/:id" element={<Artwork />} />
            <Route path="/search/:query" element={<SearchHandler />} />
          </Routes>
        </Suspense>
      )}
    </>
  );
}

export default App;
