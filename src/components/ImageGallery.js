import React, { useState } from "react";
// Components
import Spinner from "./Spinner";
// Styled
import styled from "styled-components";

const StyledImageGallery = styled.img`
  display: none;
  max-height: 100%;
  max-width: 100%;
  animation: animateImage 0.25s;

  @keyframes animateImage {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default function ImageGallery({ imageUrl }) {
  const [loading, setLoading] = useState(true);

  const handleOnLoad = (e) => {
    setLoading(false);
    e.target.style.display = "block";
  };

  return (
    <>
      {loading && <Spinner />}
      <StyledImageGallery src={imageUrl} alt="" onLoad={handleOnLoad} />
    </>
  );
}
