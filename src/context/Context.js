import React, { useContext, useState } from "react";

export const Context = React.createContext();
export function useCustomContext() {
  return useContext(Context);
}

export function ContextProvider({
  children,
  loading,
  mosaicData,
  artistsData,
  categoriesData,
}) {
  const [artwork, setArtwork] = useState({
    id: null,
    postTitle: null,
  });

  const VIEWTYPE = {
    ARTISTS: "ARTISTS",
    ARTWORK: "ARTWORK",
    CATEGORIES: "CATEGORIES",
    MOSAIC: "MOSAIC",
  };
  const [viewing, setViewing] = useState(VIEWTYPE.MOSAIC);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);

  const value = {
    current: {
      artwork,
      setArtwork,
    },
    data: {
      loading,
      mosaic: mosaicData,
      artists: artistsData,
      categories: categoriesData,
    },
    search: {
      query: searchQuery,
      setQuery: setSearchQuery,
      loading: searchLoading,
      setLoading: setSearchLoading,
      data: searchData,
      setData: setSearchData,
    },
    view: {
      type: VIEWTYPE,
      viewing,
      setViewing,
    },
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
