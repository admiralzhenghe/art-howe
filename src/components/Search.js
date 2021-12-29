import React from "react";
import styled from "styled-components";

const StyledSearch = styled.input`
  height: 2.5rem;
  margin: 1.25rem 0;
  outline: none;
  padding: 0.5rem 1rem;
  position: sticky;
  top: 1rem;
  width: 100%;
  z-index: 100;
`;

export default function Search() {
  return <StyledSearch placeholder="Search"></StyledSearch>;
}
