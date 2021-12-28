import React from "react";
import styled from "styled-components";

const StyledSearch = styled.input`
  height: 36px;
  margin: 20px 0;
  outline: none;
  padding: 0.5rem 1rem;
  position: sticky;
  top: 15px;
  width: 100%;
`;

export default function Search() {
  return <StyledSearch placeholder="Search"></StyledSearch>;
}
