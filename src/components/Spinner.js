import React from "react";
import styled from "styled-components";

const StyledSpinner = styled.div`
  display: flex;
  align-items: center;
  min-height: 100%;

  .spinner {
    border: 4px solid transparent;
    border-radius: 50%;
    border-top-color: black;
    border-bottom-color: lightgrey;
    border-right-color: lightgrey;
    border-left-color: lightgrey;
    height: 50px;
    width: 50px;
    margin: 0 auto;
    animation: loading 0.75s linear infinite;

    @keyframes loading {
      to {
        transform: rotate(1turn);
      }
    }
  }
`;

export default function Spinner() {
  return (
    <StyledSpinner>
      <div className="spinner"></div>
    </StyledSpinner>
  );
}
