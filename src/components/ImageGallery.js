import React, { useState } from "react";
// Components
import Spinner from "./Spinner";
// Styled
import styled from "styled-components";

const StyledImageGallery = styled.img`
  box-shadow: rgba(0, 0, 0, 0.4) 0px 5px 15px;
  max-width: 75%;
  display: none;
  animation: animateImage 0.2s;

  @keyframes animateImage {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media screen and (max-width: 768px) {
    object-fit: contain;
  }
`;

export default function ImageGallery({ imageUrl, setimageGalleryLoaded }) {
  const [loading, setLoading] = useState(true);

  const handleOnLoad = (e) => {
    setLoading(false);
    setimageGalleryLoaded(true);
    e.target.style.display = "block";
  };

  return (
    <>
      {loading && <Spinner />}
      <StyledImageGallery src={imageUrl} alt="" onLoad={handleOnLoad} />
    </>
  );
}
