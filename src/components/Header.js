import React from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-row: 1;

  span {
    cursor: pointer;
    font-size: 40px;
    font-weight: bolder;
  }

  @media screen and (max-width: 480px) {
    span {
      font-size: 30px;
    }
  }
`;

export default function Header({ setSearching, setSearchTerm, setViewing }) {
  return (
    <StyledHeader>
      <span
        onClick={() => {
          // Clear the searching state
          setSearching(false);
          // Clear the search bar by passing in a new reference to an empty string
          setSearchTerm("" + "");
          setViewing(false);
        }}
      >
        ART HOWE
      </span>
    </StyledHeader>
  );
}
