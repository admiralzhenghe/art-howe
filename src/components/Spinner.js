import React from "react";
import styled from "styled-components";

const StyledSpinner = styled.div`
  border: 4px solid transparent;
  border-radius: 50%;
  border-top-color: black;
  border-bottom-color: black;
  height: 50px;
  width: 50px;
  margin: 0 auto;
  animation: loading 1s linear infinite;

  @keyframes loading {
    to {
      transform: rotate(1turn);
    }
  }
`;

export default function Spinner() {
  return <StyledSpinner />;
}
