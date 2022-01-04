import React from "react";
// Context
import { useCustomContext } from "../context/Context";
// Styled
import styled from "styled-components";

const StyledSearch = styled.input`
  border: 1px solid black;
  font-size: 1.5rem;
  grid-row: 2;
  height: 50px;
  margin: 1rem 0;
  outline: none;
  padding: 0 1rem;
  position: sticky;
  top: 1rem;
  width: 100%;
  z-index: 100;

  &::placeholder {
    font-family: "EB Garamond", serif;
    color: black;
  }

  @media screen and (max-width: 768px) {
    height: 2.5rem;
    font-size: 1.25rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }
`;

export default function Search() {
  const {
    searchTerm,
    setSearchTerm,
    setViewingArtwork,
    setViewingCategories,
    setViewingSearches,
  } = useCustomContext();

  // Live search
  const handleSearch = (e) => {
    // Whenever a search term is inputted, turn off the viewing artwork state
    setViewingArtwork(false);
    // And turn of the viewing categories state
    setViewingCategories(false);

    let search = e.target.value;
    // If there are words in the search bar
    if (search.length) {
      setViewingSearches(true);
      setSearchTerm(search);
    } else {
      // If the search bar is empty, return back to the main landing page
      setViewingSearches(false);
      setSearchTerm("");
    }
  };

  return (
    <StyledSearch
      placeholder="Search"
      onInput={handleSearch}
      value={searchTerm}
    ></StyledSearch>
  );
}
