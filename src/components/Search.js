import React from "react";
import styled from "styled-components";

const StyledSearch = styled.input`
  border: 1px solid black;
  grid-row: 2;
  margin: 1.25rem 0;
  outline: none;
  padding: 0.5rem 1rem;
  position: sticky;
  top: 1rem;
  width: 100%;
  z-index: 100;
`;

export default function Search({
  setSearching,
  searchTerm,
  setSearchTerm,
  setViewing,
}) {
  // Live search
  const handleSearch = (e) => {
    // Whenever a search term is inputted, turn off the viewing artwork state
    setViewing(false);
    let search = e.target.value;
    // If there are words in the search bar
    if (search.length) {
      setSearching(true);
      setSearchTerm(search);
    } else {
      // If the search bar is empty, return back to the main landing page
      setSearching(false);
      setSearchTerm("" + "");
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
