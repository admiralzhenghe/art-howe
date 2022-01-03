import React, { useContext, useState } from "react";

export const Context = React.createContext();

export function useCustomContext() {
  return useContext(Context);
}

export function ContextProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewingArtwork, setViewingArtwork] = useState(false);
  const [viewingCategories, setViewingCategories] = useState(false);
  const [viewingSearches, setViewingSearches] = useState(false);

  const value = {
    searchTerm,
    setSearchTerm,
    viewingArtwork,
    setViewingArtwork,
    viewingCategories,
    setViewingCategories,
    viewingSearches,
    setViewingSearches,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
