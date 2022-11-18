import React from "react";
import App from "./App";
// Context
import { ContextProvider } from "./context/Context";
// Custom Hooks
import { useFetchFilters } from "./hooks/useFetchFilters";
import { useFetchMosaic } from "./hooks/useFetchMosaic";

export default function DataWrapper() {
  const [filtersLoading, [artistsData, categoriesData]] = useFetchFilters();
  const [mosaicLoading, mosaicData] = useFetchMosaic();

  return (
    <ContextProvider
      loading={mosaicLoading || filtersLoading ? true : false}
      mosaicData={mosaicData}
      artistsData={artistsData}
      categoriesData={categoriesData}
    >
      <App />
    </ContextProvider>
  );
}
