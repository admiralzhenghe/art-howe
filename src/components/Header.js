import React from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50px;

  span {
    cursor: pointer;
    font-size: 40px;
    font-weight: bolder;
  }
`;

export default function Header({ setViewing }) {
  return (
    <StyledHeader>
      <span onClick={() => setViewing(false)}>ART HOWE</span>
    </StyledHeader>
  );
}
