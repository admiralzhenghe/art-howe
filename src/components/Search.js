import React from "react";
import styled from "styled-components";

const StyledSearch = styled.input`
  width: 100%;
  margin: 10px 0 20px 0;
  padding: 0.5rem 1rem;
  outline: none;
`;

export default function Search() {
  return <StyledSearch placeholder="Search"></StyledSearch>;
}
