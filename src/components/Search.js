import React from "react";
// Components
import SearchHandler from "./SearchHandler";
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
    font-size: 1.25rem;
    height: 2.5rem;
  }
`;

export default function Search() {
  const { search, view } = useCustomContext();

  // Live search
  const handleSearch = (e) => {
    let currentQuery = e.target.value;
    // If there are words in the search bar
    if (currentQuery.length) {
      search.setQuery(currentQuery);
    } else {
      // If the search bar is empty, return to the full mosaic
      search.setQuery("");
      search.setLoading(false);
    }
    view.setViewing(view.type.MOSAIC);
  };

  return (
    <>
      {search.query.length !== 0 && <SearchHandler />}
      <StyledSearch
        placeholder="Search"
        onInput={handleSearch}
        value={search.query}
      ></StyledSearch>
    </>
  );
}
