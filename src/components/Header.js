import React from "react";
// Context
import { useCustomContext } from "../context/Context";
// Styled
import styled from "styled-components";

const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-row: 1;

  span {
    cursor: pointer;
    font-size: 50px;
    letter-spacing: 0.1rem;
  }

  @media screen and (max-width: 480px) {
    span {
      font-size: 30px;
    }
  }
`;

export default function Header() {
  const { setSearchTerm, setViewingSearches, setViewingArtwork } =
    useCustomContext();

  return (
    <StyledHeader>
      <span
        onClick={() => {
          // Clear the viewing artwork state
          setViewingArtwork(false);
          // Clear the searching state
          setViewingSearches(false);
          // Clear the search bar
          setSearchTerm("");
        }}
      >
        <span style={{ color: "var(--blue)" }}>A</span>
        <span style={{ color: "var(--orange)" }}>R</span>
        <span style={{ color: "var(--blue)" }}>T</span>
        <span> </span>
        <span style={{ color: "var(--orange)" }}>H</span>
        <span style={{ color: "var(--blue)" }}>O</span>
        <span style={{ color: "var(--orange)" }}>W</span>
        <span style={{ color: "var(--blue)" }}>E</span>
      </span>
    </StyledHeader>
  );
}
