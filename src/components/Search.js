import React from "react";
import styled from "styled-components";

const StyledSearch = styled.input`
  width: 100%;
  margin: 10px 0 20px 0;
  outline: none;
  padding: 0.5rem 1rem;
  position: sticky;
  top: 15px;
`;

export default function Search() {
  return <StyledSearch placeholder="Search"></StyledSearch>;
}
